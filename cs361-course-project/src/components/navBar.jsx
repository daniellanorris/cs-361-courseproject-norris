"use client";

import Link from "next/link";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { useAuth } from "../components/appProvider";
import { useEffect } from "react";
import handleLogout from "../utils/logout"

export function NavBar({ loggedInItems, notLoggedInItems }) {
    const { user } = useAuth();

    useEffect(() => {
        console.log("Navbar user changed:", user);
    }, [user]);


    const items = user ? loggedInItems : notLoggedInItems;


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Box
                        component="ul"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 3,
                            listStyle: "none",
                            m: 0,
                            p: 0,
                        }}
                    >

                        {items.map((item) => {
                            console.log("Navbar item:", item);

                            return (
                                <Box
                                    component="li"
                                    key={item.href}
                                >
                                    {item.name === "Logout" ? (
                                        <Button onClick={handleLogout}>
                                            Logout
                                        </Button>
                                    ) : (
                                        <Link href={item.href}>
                                            {item.name}
                                        </Link>
                                    )}
                                </Box>
                            );
                        })}

                    </Box>

                </Toolbar>
            </AppBar>
        </Box>
    );
}