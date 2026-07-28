import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Divider,
    Typography,
    Button
} from "@mui/material";


export default async function MoviePage({ params }) {
    const { id: movieId } = await params;

    const response = await fetch(
        "http://localhost:3000/api/tmdb/movieById",
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
        return <Typography variant="h4">Movie not found</Typography>;
    }

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
                    subheader={movie.release_date}
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

                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Overview
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                    >
                        {movie.overview}
                    </Typography>
                    <Divider></Divider>
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Genres
                    </Typography>
                    {movie.genres.map((genre) => {
                        return (
                            <Chip label={genre.name} />


                        )
                    })}

                      <Divider></Divider>
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Production Companies
                    </Typography>
                    {movie.production_companies.map((production_company) => {
                        return (
                            <Chip label={production_company.name} />

                        )
                    })}
                </CardContent>
                <Button> Watch Movie </Button>
            </Card>

        </Box>
    );
}