"use client";

import Link from "next/link";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { useAuth } from "../components/appProvider";
import { useRouter } from "next/navigation";

export function NavBar({ loggedInItems, notLoggedInItems }) {
    const { user, setUser, logout } = useAuth();
    const router = useRouter();

    function handleLogout() {
        setUser(null);
        logout()
        router.push("/login");
    }

    const items = user ? loggedInItems : notLoggedInItems;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box
                        component="ul"
                        sx={{
                            display: "flex",
                            gap: 3,
                            listStyle: "none",
                            m: 0,
                            p: 0,
                        }}
                    >
                        {items.map((item) => (
                            <Box component="li" key={item.href}>
                                {item.name === "Logout" ? (
                                    <Button
                                        color="inherit"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <Button
                                        component={Link}
                                        href={item.href}
                                        color="inherit"
                                    >
                                        {item.name}
                                    </Button>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}