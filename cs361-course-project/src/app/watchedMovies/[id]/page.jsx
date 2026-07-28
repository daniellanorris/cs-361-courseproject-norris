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
import { withTheme } from '@emotion/react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)

export default function Movies() {
  const [watchedMovies, setWatchedMovies] = useState([])
  const [titleFilter, setTitleFilter] = useState('')
  const [ratingFilter, setRatingFilter] = useState('all')
  const { id } = useParams()

  useEffect(() => {
    getWatchedMovies()
  }, [])

  async function getWatchedMovies() {
    const { data, error } = await supabase
      .from("SavedMovies")
      .select("movie_id")
      .eq("user_id", id)

    if (error) {
      console.error(error)
      return
    }

    const movieIds = data.map((row) => row.movie_id)

    const response = await fetch("/api/tmdb/moviesById", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieList: movieIds }),
    })

    const movieData = await response.json()
    setWatchedMovies(movieData.movies)
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

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filteredMovies.map((movie) => (
          <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4 }} sx={{ margin: "12px" }}>
            <Card>
              <CardContent>
                {movie.poster_path && (
                  <Image
                    width={200}
                    height={300}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                )}

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                  {movie.genres.map((genre) => (
                    <Chip key={genre.id} label={genre.name} />
                  ))}
                </Box>

                <Typography variant="h6" sx={{ mt: 1 }}>
                  {movie.original_title}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Rating: {movie.vote_average?.toFixed(1)} / 10
                </Typography>

                <Typography sx={{ mt: 1, mb: 2 }}>
                  {movie.overview}
                </Typography>

                <Button variant="contained" href={`/movie/${movie.id}`}>
                  Re-watch movie
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}