import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Divider,
    Typography,
} from "@mui/material";

import SaveMovieButton from "../../../components/saveMovieButton";

export default async function MoviePage({ params }) {

    const { id: movieId } = await params;

    // Get movie
    const response = await fetch(
        "http://localhost:3001/api/tmdb/movieById",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                movie: movieId,
            }),
        }
    );

    const data = await response.json();
    const movie = data.movie;

    if (!movie) {
        return (
            <Typography variant="h4">
                Movie not found
            </Typography>
        );
    }

    // Format release date using date microservice
    const dateResponse = await fetch(
        `http://localhost:${process.env.DATE_TIME_PORT}/format-date`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: movie.release_date,
            }),
        }
    );

    const dateData = await dateResponse.json();

    console.log("Date response:", dateData);

    const formattedDate = dateData.formattedDate;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                py: 5,
                px: 2,
            }}
        >
            <Card
                sx={{
                    maxWidth: 900,
                    width: "100%",
                    borderRadius: 3,
                    boxShadow: 6,
                }}
            >

                {movie.poster_path && (
                    <CardMedia
                        component="img"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.original_title}
                        sx={{
                            width: 250,
                            height: "auto",
                            mx: "auto",
                            mt: 2,
                            borderRadius: 2,
                        }}
                    />
                )}

                <CardHeader
                    title={movie.original_title}
                    subheader={formattedDate}
                />

                <Divider />

                <CardContent>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            mb: 3,
                            flexWrap: "wrap",
                        }}
                    >
                        <Chip
                            label={`${movie.vote_average.toFixed(1)}/10`}
                            color="primary"
                        />

                        <Chip
                            label={`${movie.runtime} minutes`}
                            variant="outlined"
                        />

                        <Chip
                            label={movie.original_language.toUpperCase()}
                            variant="outlined"
                        />
                    </Box>

                    <Typography variant="h6" gutterBottom>
                        Overview
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                    >
                        {movie.overview}
                    </Typography>

                    <Divider />

                    <Typography variant="h6" gutterBottom>
                        Genres
                    </Typography>

                    {movie.genres.map((genre) => (
                        <Chip
                            key={genre.id}
                            label={genre.name}
                            sx={{ mr: 1 }}
                        />
                    ))}

                    <Divider />

                    <Typography variant="h6" gutterBottom>
                        Production Companies
                    </Typography>

                    {movie.production_companies.map((company) => (
                        <Chip
                            key={company.id}
                            label={company.name}
                            sx={{ mr: 1 }}
                        />
                    ))}

                </CardContent>

                <SaveMovieButton movieId={movieId} />

            </Card>
        </Box>
    );
}