"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/appProvider";

export default function handleLogout() {
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        logout();
        router.replace("/welcome");
    }, [logout, router]);

    return <p>Logging out...</p>;
}