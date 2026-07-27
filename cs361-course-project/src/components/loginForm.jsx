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

import {useAuth} from '../components/appProvider'

import { useState } from "react";

import { confirmAuthentication } from "../lib/db";

import { useRouter } from "next/navigation";


export default function LoginForm() {

    const router = useRouter();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = await confirmAuthentication(
            formData.email,
            formData.password
        );

        if (!user) {
            alert("Invalid username or password");
            return;
        }

        login(user);

        router.push("/home");
    };

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

                </CardContent>
            </Card>
        </Box>
    );
}