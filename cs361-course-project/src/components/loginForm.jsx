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


import { useState } from "react";



export default function LoginForm() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [authResponse, setAuthResponse] = useState("")
    const [authColor, setAuthColor] = useState("")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:3000/api/supabase/confirm-authentication",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: formData.email,
                        password: formData.password,
                    }),
                }
            );


            const data = await response.json();

            if (response.status == 200) {
                setAuthResponse("User found")

            }

            if (response.status == 400) {
                setAuthColor('red')
                setAuthResponse("Username or password is incorrect")
            }


            console.log("Authentication response:", data);

        } catch (error) {
            console.error(
                "Failed to connect to authentication service:",
                error
            );
        }
    }
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
                        Login
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="email-input">
                                Email Address
                            </InputLabel>

                            <Input
                                id="email-input"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

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
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
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
                            <Button
                                variant="contained"
                                type="submit"
                            >
                                Submit
                            </Button>

                            <Button
                                variant="outlined"
                                href="/welcome"
                            >
                                Back
                            </Button>
                        </Box>
                    </Box>
                    {authColor === 'red' &&
                        <FormHelperText style={{ background: "#CA3433", padding: "10px", margin: "5px", border: "10px", opacity: ".5", color: "white" }}>
                            {authResponse}
                        </FormHelperText>
                    }

                </CardContent>
            </Card>
        </Box>
    );
}