"use client";

import {
    Box,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Button,
} from "@mui/material";

export default function RegForm() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
            }}
        >
            <Card sx={{ width: 400 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Register
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="fname-input">
                            First Name
                        </InputLabel>
                        <Input id="fname-input" />
           
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="lname-input">
                            Last Name
                        </InputLabel>
                        <Input id="lname-input" />
           
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="email-input">
                            Email Address
                        </InputLabel>
                        <Input id="email-input" />
                        <FormHelperText>
                            We'll never share your email.
                        </FormHelperText>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="password-input">
                            Password
                        </InputLabel>
                        <Input
                            id="password-input"
                            type="password"
                        />
                    </FormControl>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            mt: 3,
                            justifyContent: "space-between",
                        }}
                    >
                        <Button variant="contained">
                            Submit
                        </Button>

                        <Button
                            variant="outlined"
                            href="/welcome"
                        >
                            Back
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}