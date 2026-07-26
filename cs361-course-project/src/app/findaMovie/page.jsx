"use client";

import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";


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


    const [moodKeywords, setMoodKeywords] =
        useState([]);


    const [movieKeywords, setMovieKeywords] = useState([]);

    const [selectedKeywords, setSelectedKeywords] = useState([])

    const [selectedMood, setSelectedMood] =
        useState(null);


    const [loadingMovies, setLoadingMovies] =
        useState(true);



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
                data.keywords ?? []
            );


            setProgressBar(100);


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

function movieAndKeywordMatches() {
    console.log(movieIdList)
    console.log(selectedKeywords)
    

}

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

                        }}

                    >

                        {
                            loadingMovies
                                ? "Loading Movies..."
                                : "Generate Keywords"
                        }

                    </Button>


                </CardContent>



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

                            movieKeywords.map((keyword, index) => (
                                <Box key={index}>
                                    <Button variant={
                                        selectedKeywords.includes(keyword)
                                            ? "contained"
                                            : "outlined"
                                    } key={index}
                                        onClick={() => { selectedKeywords.includes(keyword) ? removeFromKeywords(keyword) : appendToKeywords(keyword) }}> {keyword}
                                    </Button>

                                </Box>

                            ))
                    }


                </CardContent>


            </Card>



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