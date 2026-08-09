"use client"

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)

export default function Movies() {
  const [watchedMovies, setWatchedMovies] = useState([])
  const [titleFilter, setTitleFilter] = useState('')
  const [ratingFilter, setRatingFilter] = useState('all')


  function getUserFromCookie() {
    const cookies = document.cookie.split("; ");

    const userCookie = cookies.find(cookie =>
      cookie.startsWith("user=")
    );

    if (!userCookie) {
      return null;
    }

    const value = decodeURIComponent(
      userCookie.substring("user=".length)
    );

    return JSON.parse(value);
  }

  useEffect(() => {
    getWatchedMovies();
  }, []);


  async function getWatchedMovies() {
    try {
      const user = getUserFromCookie();

      if (!user) {
        console.error("No authenticated user found");
        return;
      }

      const response = await fetch(
        `http://localhost:${process.env.NEXT_PUBLIC_SAVE_MOVIE}/saved-movies?id=${user.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to get saved movies:", data);
        return;
      }

      const movieCounts = {};

      data.forEach((movie) => {
        movieCounts[movie.movie_id] =
          (movieCounts[movie.movie_id] || 0) + 1;
      });

      const uniqueMovieIds = Object.keys(movieCounts);

      const movieResponse = await fetch("/api/tmdb/moviesById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieList: uniqueMovieIds,
        }),
      });

      const movieData = await movieResponse.json();

      const moviesWithCounts = movieData.movies.map((movie) => ({
        ...movie,
        watchCount: movieCounts[movie.id] || 0
      }));

      setWatchedMovies(moviesWithCounts);

    } catch (error) {
      console.error("Failed to get watched movies:", error);
    }
  }
  const filteredMovies = watchedMovies.filter((movie) => {
    const matchesTitle = movie.original_title
      .toLowerCase()
      .includes(titleFilter.toLowerCase())

    const rating = movie.vote_average

    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'high' && rating >= 7) ||
      (ratingFilter === 'mid' && rating >= 5 && rating < 7) ||
      (ratingFilter === 'low' && rating < 5)

    return matchesTitle && matchesRating
  })

  return (
    <>
      <Typography sx={{ margin: "10px" }} variant="h4">
        Your watched movies
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mx: 1, mb: 2, flexWrap: 'wrap' }}>
        <TextField

          label="Search by title"
          variant="outlined"
          size="small"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          sx={{
            minWidth: 220,
            '& fieldset': { borderColor: 'white' },
            '& label': { color: 'white' },
            '& input': { color: 'white' },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel
            sx={{
              color: "white"
            }}>Rating</InputLabel>
          <Select
            value={ratingFilter}
            label="Rating"
            onChange={(e) => setRatingFilter(e.target.value)}
            sx={{
              minWidth: 180,
              '& fieldset': { borderColor: 'white' },
              '& label': { color: 'white' },
              '& .MuiSelect-select': { color: 'white' },
              '& .MuiSvgIcon-root': { color: 'white' },
            }}
          >
            <MenuItem value="all">All ratings</MenuItem>
            <MenuItem value="high">High (7+)</MenuItem>
            <MenuItem value="mid">Mid (5–6.9)</MenuItem>
            <MenuItem value="low">Low (under 5)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredMovies.length === 0 && (
        <Typography sx={{ mx: 1 }}>
          No movies match your filters.
        </Typography>
      )}

      <Grid
        container
        spacing={3}
        sx={{
          mt: 2,
          px: 2,
          alignItems: "stretch",
        }}
      >
        {filteredMovies.map((movie) => (
          <Grid
            key={movie.id}
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{
              display: "flex",
            }}
          >
            <Card
              sx={{
                width: "100%",
                height: 650,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.25)",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",

                "&:hover": {
                  boxShadow: "0 0 25px rgba(255, 255, 255, 0.55)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {movie.poster_path && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    <Image
                      width={200}
                      height={300}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.original_title}
                    />
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    mt: 1,
                  }}
                >
                  {movie.genres.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                    />
                  ))}
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    mt: 1,
                    minHeight: "32px",
                  }}
                >
                  {movie.original_title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  Number of times watched: {movie.watchCount}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  Rating: {movie.vote_average?.toFixed(1)} / 10
                </Typography>

                {/* Scrollable description */}
                <Box
                  sx={{
                    height: 100,
                    overflowY: "scroll",
                    mb: 2,
                    pr: 1,
                  }}
                >
                  <Typography>
                    {movie.overview}
                  </Typography>
                </Box>

                {/* Keep button at bottom */}
                <Box sx={{ mt: "auto" }}>
                  <Button
                    variant="contained"
                    href={`/movie/${movie.id}`}
                    fullWidth
                  >
                    View Movie Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}