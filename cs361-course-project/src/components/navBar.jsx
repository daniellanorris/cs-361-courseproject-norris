"use client";

import Link from "next/link";
import { AppBar, Toolbar, Box } from "@mui/material";

export function NavBar({ items }) {
    const auth = true;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {auth && (
                        <ul>
                            {items.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}