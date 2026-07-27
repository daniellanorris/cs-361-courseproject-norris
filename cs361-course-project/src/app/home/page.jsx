"use client"

import { Card, CardContent, Box, Button, Typography } from "@mui/material";
import { useAuth } from "../../components/appProvider";

export default function HomePage() {
   const { user } = useAuth();
   console.log('user', user)


  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Card
          sx={{
            width: 400,
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography variant="h5">
              Home
            </Typography>

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
    </>
  );
}