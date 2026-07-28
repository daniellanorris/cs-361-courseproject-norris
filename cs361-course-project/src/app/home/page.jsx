"use client"

import { Card, CardContent, Box, Button, Typography } from "@mui/material";
import { useAuth } from "../../components/appProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.id) {
            router.push("/welcome");
        }
    }, [user]);

    if (!user?.id) return null;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
            }}
        >
            <Typography sx={{ margin: "10px" }} variant="h5">
                Home
            </Typography>
            <Card sx={{ width: 400, textAlign: "center" }}>
                <CardContent>


                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Looking for a movie? Look no further. Let's put a stop to
                        arguing with yourself, your partner, and your friends.
                        And just gimme a movie already.
                    </Typography>

                    <Box sx={{ mt: 3 }}>
                        <Button href="/findaMovie">
                            Find a Movie
                        </Button>
                        <Button href={`/watchedMovies/${user.id}`}>
                            My Movies
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}