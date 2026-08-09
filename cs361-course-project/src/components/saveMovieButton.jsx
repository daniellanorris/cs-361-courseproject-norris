"use client";

import { Button } from "@mui/material";
import { useAuth } from "./appProvider";
import { useEffect, useState } from "react";

export default function SaveMovieButton({ movieId }) {
    const { user } = useAuth();
    const [saved, setIsSaved] = useState(false);

    console.log("User:", user?.id);
    console.log("Movie ID:", movieId);

    // Check whether this movie is already saved
    async function checkIfSaved() {
        if (!user || !movieId) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:${process.env.NEXT_PUBLIC_SAVE_MOVIE}/is-saved`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        movie_id: movieId,
                        user_id: user.id,
                    }),
                }
            );

            const data = await response.json();

            console.log("Is saved status:", response.status);
            console.log("Is saved response:", data);

            if (!response.ok) {
                console.error(
                    "Failed to check if saved:",
                    data.error
                );
                return;
            }

            setIsSaved(data);

        } catch (error) {
            console.error(
                "Failed to check if movie is saved:",
                error
            );
        }
    }

    useEffect(() => {
        setIsSaved(false);

        if (user && movieId) {
            checkIfSaved();
        }
    }, [user, movieId]);

    // Save movie
    async function saveMovie() {
        if (!user) {
            console.error("No logged-in user");
            return;
        }

        console.log('user', user.id)
        console.log('movie', movieId)
        try {
            const response = await fetch(
                `http://localhost:${process.env.NEXT_PUBLIC_SAVE_MOVIE}/save-movie/${user.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        movie_id: movieId,
                    }),
                }
            );

            const data = await response.json();

            console.log("Save movie status:", response.status);
            console.log("Save movie response:", data);

            if (!response.ok) {
                console.error(
                    "Failed to save movie:",
                    data.error
                );
                return;
            }

            console.log("Movie saved successfully!");

            // Disable button after successful save
            setIsSaved(true);

        } catch (error) {
            console.error(
                "Failed to save movie:",
                error
            );
        }
    }

    return (
        <>


            <Button
                sx={{ margin: "10px" }}
                variant="contained"
                color="secondary"
                onClick={saveMovie}
            >
                {saved ? "Re-watch Movie" : "Watch Movie"}
            </Button>
        </>

    );
}