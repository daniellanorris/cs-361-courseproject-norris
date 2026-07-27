import {Card, CardHeader, CardContent, Box, Button} from '@mui/material'

export default function Welcome() {

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
        <Card sx={{ width: 400,
            textAlign: "center"
         }}>
            <CardContent> Welcome to Gimme Movie </CardContent>
            <Box>
                <Button href="/login"> Login</Button>
                <Button href="/register"> Register </Button>
            </Box>

        </Card>
</Box>
        </>
    )
    
}