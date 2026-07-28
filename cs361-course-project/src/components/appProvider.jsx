"use client";

import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AppContext = createContext(null);

export function AppProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = Cookies.get("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);


    const login = (user) => {
        setUser(user);

        Cookies.set(
            "user",
            JSON.stringify(user),
            {
                expires: 7, // cookie lasts 7 days, can change if I want
                secure: true,
                sameSite: "strict"
            }
        );
    };


    const logout = () => {
        setUser(null);
        Cookies.remove("user");
    };


    return (
        <AppContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </AppContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAuth must be used within AppProvider");
    }

    return context;
}