"use client"

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'

export default function Movies() {

    // TODO: add mood and keyword hookup to db so we can map through list of keywords.
    // Will use mood to inform the keywords returned

    const [progressBar, setProgressBar] = useState("mood")

    async function changeProgressBar(value) {
        setProgressBar(value)

    }

    useEffect(() => {

    }, [progressBar])

    return (
        <>
            <div>
                Movie selection
            </div>
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={50} />
            </Box>
            <Card>
                <CardContent>
                    <h1> Select a Mood </h1>
                    <p> Test mood </p>
                    <Button> Proceed to select a Keyword</Button>
                </CardContent>
                <CardContent >
                    <h1> Select a Keyword </h1>
                    <p> Test keyword </p>
                    <Button> Proceed to generate movies </Button>
                </CardContent>

            </Card>
        </>
    )
}