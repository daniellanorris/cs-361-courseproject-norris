import { Card, CardContent, Box, Button, Typography } from '@mui/material'

export default function Welcome() {
    return (
        <Box sx={{ backgroundColor: '#111', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            

            <Box sx={{ width: '100%', maxWidth: 780, display: 'flex', flexDirection: 'column', alignItems: 'center', px: 4, pb: 6 }}>
                <Typography
                    variant="h2"
                    sx={{
                        color: '#fff',
                        fontWeight: 'bold',
                        letterSpacing: 2,
                        mt: 3,
                        mb: 1.5,
                        textAlign: 'center',
                    }}
                >
                    Gimme Movie
                </Typography>

                <Typography
                    sx={{
                        color: '#ccc',
                        fontSize: 15,
                        lineHeight: 1.65,
                        textAlign: 'center',
                        maxWidth: 560,
                        mb: 4,
                    }}
                >
                    Having trouble finding movies? Let Gimme Movie ease your movie-finding woes.
                    This <em>free</em> web application not only generates titles for you, but allows you to
                    save these titles as 'watched' films so that you're not drawing a blank next
                    time someone asks you, "what's the last movie you watched?".
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        href="/login"
                        variant="contained"
                        sx={{
                            backgroundColor: '#444',
                            color: '#eee',
                            border: '1.5px solid #888',
                            borderRadius: 1,
                            px: 5,
                            '&:hover': { backgroundColor: '#425bd6ff' },
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        href="/register"
                        variant="outlined"
                        sx={{
                            backgroundColor: '#111',
                            color: '#eee',
                            border: '1.5px solid #888',
                            borderRadius: 1,
                            px: 5,
                            '&:hover': { backgroundColor: '#425bd6ff' , border: '1.5px solid #888' },
                        }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}