"use client"

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState} from 'react'
import { useParams } from 'next/navigation'
import 'dotenv/config'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)



export default function Movies() {
  const [watchedMovies, setWatchedMovies] = useState([])
  const { id } = useParams();

  useEffect(() => {
    getWatchedMovies()
  }, [])

  async function getWatchedMovies() {
    const { data, error } = await supabase
      .from("SavedMovies")
      .select("*")
      .eq("user_id", id)
      

    if (error) {
      console.error(error);
      return;
    }

    setWatchedMovies(data);
  }

  return (
    <ul>
      {watchedMovies.map((movies) => (
        <Card key={movies.id}variant="outlined">
          <CardContent>
            <li key={movies.id}>{movies.movie_id}</li>
          </CardContent>
          <CardActions>
            <Button> Watch Again</Button>
          </CardActions>
        </Card>
      ))}
    </ul>
  )
}

