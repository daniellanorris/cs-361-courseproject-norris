"use client";

import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import Grid from "@mui/material/Grid";



const moodList = [
    "happy",
    "sad",
    "melancholy",
    "joyful",
    "appreciative",
    "cynical",
    "social",
    "sultry",
    "sinful",
    "fearless",
    "existential"
];



export default function Movies() {


    const [progressBar, setProgressBar] = useState(33);

    const [confirmationDialog, setConfirmationDialog] =
        useState(false);


    const [movieIdList, setMovieIdList] =
        useState([]);

    const [whatModal, setModal] = useState(0)


    const [moodKeywords, setMoodKeywords] =
        useState([]);


    const [movieKeywords, setMovieKeywords] = useState([]);

    const [selectedKeywords, setSelectedKeywords] = useState([])

    const [selectedMood, setSelectedMood] =
        useState(null);


    const [loadingMovies, setLoadingMovies] =
        useState(true);

    const [finalMovieList, setFinalMovieList] = useState([])



    const canGenerateKeywords =
        selectedMood &&
        movieIdList.length > 0;



    useEffect(() => {


        async function loadMovies() {

            try {

                const response =
                    await fetch("/api/tmdb");


                const data =
                    await response.json();


                console.log(
                    "Generated movie IDs:",
                    data.movieIdList
                );




                setMovieIdList(data.movieIdList);

                setMovieKeywords(data.movieKeywords);


            }
            catch (error) {

                console.error(error);

            }
            finally {

                setLoadingMovies(false);

            }

        }


        loadMovies();


    }, []);




    async function generateKeywords() {


        if (!canGenerateKeywords) {
            return;
        }


        try {


            const response =
                await fetch("/api/groq",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            movieIdList,

                            selectedMood

                        })

                    });



            const data =
                await response.json();



            setMoodKeywords(
                data.filtered_keywords ?? []
            );


        }
        catch (error) {

            console.error(error);

        }

    }


    function appendToKeywords(keyword) {

        setSelectedKeywords(prev => {

            if (prev.includes(keyword)) {
                return prev;
            }

            return [
                ...prev,
                keyword
            ];

        });

    }

    // ties all 3 components together: mood, keyword, and final movie gen.
    // using movie id list x selected keywords, find matching keywords within 
    // that movie list. not using groq for this specific component.



    function removeFromKeywords(keyword) {

        const indexToRemove = selectedKeywords.findIndex(
            item => item === keyword
        );

        if (indexToRemove === -1) {
            return;
        }

        const updatedKeywords = [...selectedKeywords];

        updatedKeywords.splice(indexToRemove, 1);

        setSelectedKeywords(updatedKeywords);

    }
    async function generateMovieList(movieIdList, selectedKeywords) {
        try {
            const response = await fetch("/api/tmdb/filteredMovies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    movieIdList,
                    selectedKeywords,
                }),
            });


            const data = await response.json();
            console.log(data)

            setFinalMovieList(data.movies);


            await generateMovieDetails(data.movies);
        } catch (error) {
            console.error(error);
        }


    }

    async function generateMovieDetails(finalMovieList) {
        try {
            const response = await fetch("/api/tmdb/moviesById", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    movieList: finalMovieList
                }),

            });


            const data = await response.json();
            console.log('final movie list', data)
            setFinalMovieList(data.movies)


        } catch (error) {
            console.error(error);
        }


    }

    return (

        <>

            <Typography variant="h4">
                Movie Selection
            </Typography>


            <Box sx={{ mb: 2 }}>

                <LinearProgress
                    variant="determinate"
                    value={progressBar}
                />

            </Box>


            {whatModal === 0 && (


                <Card>


                    <CardContent>

                        <Typography variant="h5">
                            Select a Mood
                        </Typography>


                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            mt: 2
                        }}>


                            {
                                moodList.map(mood => (

                                    <Button

                                        key={mood}

                                        variant={
                                            selectedMood === mood
                                                ? "contained"
                                                : "outlined"
                                        }

                                        onClick={() =>
                                            setSelectedMood(mood)
                                        }

                                    >

                                        {mood}

                                    </Button>


                                ))
                            }


                        </Box>



                        <Button

                            sx={{ mt: 3 }}

                            disabled={!canGenerateKeywords}

                            onClick={() => {

                                setProgressBar(66);

                                generateKeywords();
                                setModal(1)

                            }}

                        >

                            {
                                loadingMovies
                                    ? "Loading Movies..."
                                    : "Generate Keywords"
                            }

                        </Button>


                    </CardContent>
                </Card>

            )}

            {whatModal == 1 && (
                <Card>
                    <CardContent>


                        <Typography variant="h5">
                            Select Keywords
                        </Typography>



                        {
                            moodKeywords.length === 0

                                ?

                                <Typography>
                                    No keywords generated.
                                </Typography>

                                :

                                moodKeywords.map((keyword) => (
                                    <Box key={keyword}>
                                        <Button variant={
                                            selectedKeywords.includes(keyword)
                                                ? "contained"
                                                : "outlined"
                                        }
                                            onClick={() => { selectedKeywords.includes(keyword) ? removeFromKeywords(keyword) : appendToKeywords(keyword) }}> {keyword}
                                        </Button>

                                    </Box>

                                ))
                        }

                        <Box>
                            <Button onClick={() => {
                                generateMovieList(movieIdList, selectedKeywords)
                                setModal(2)
                                setProgressBar(100)

                            }
                            }> Generate Movies </Button>
                        </Box>
                    </CardContent>


                </Card>

            )}
            {whatModal == 2 && (

                <>

                    <Typography variant="h5">
                        Generated Movies
                    </Typography>


                    {
                        finalMovieList.length === 0

                            ?

                            <Typography>
                                No movies generated, please select different keywords
                            </Typography>

                            :

                            <Grid
                                container
                                spacing={3}
                                sx={{ mt: 2 }}
                            >

                                {finalMovieList.map(movie => (

                                    <Grid
                                        key={movie.id}
                                        size={{
                                            xs: 12,
                                            sm: 6,
                                            md: 4
                                        }}
                                    >

                                        <Card>

                                            <CardContent>

                                                {
                                                    movie.poster_path && (
                                                        <Image
                                                            width={200}
                                                            height={300}
                                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                            alt={movie.original_title}
                                                        />
                                                    )
                                                }


                                                <Typography variant="h6">
                                                    {movie.original_title}
                                                </Typography>


                                                <Typography
                                                    sx={{
                                                        mt: 1,
                                                        mb: 2
                                                    }}
                                                >
                                                    {movie.overview}
                                                </Typography>


                                                <Button
                                                    variant="contained"
                                                    href={`/movie/${movie.id}`}
                                                >
                                                    Watch Movie
                                                </Button>


                                            </CardContent>

                                        </Card>

                                    </Grid>

                                ))
                                }

                            </Grid>

                    }


                    <Box sx={{ mt: 3 }}>
                        <Button href="/home">
                            Finish
                        </Button>
                    </Box>


                </>

            )}

            <Modal
                open={confirmationDialog}
                onClose={() => setConfirmationDialog(false)}
            >

                <Box sx={{
                    width: 400,
                    bgcolor: "background.paper",
                    p: 3,
                    mx: "auto",
                    mt: "20%"
                }}>


                    <Typography>
                        Regenerate movies?
                    </Typography>


                    <Button
                        onClick={() => {
                            setConfirmationDialog(false);
                            generateKeywords();
                        }}
                    >
                        Yes
                    </Button>


                    <Button
                        onClick={() => setConfirmationDialog(false)}
                    >
                        Cancel
                    </Button>


                </Box>


            </Modal>


        </>

    )

}