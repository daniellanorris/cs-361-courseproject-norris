"use client"

import { useAuth } from "../components/appProvider";

export default function getUserId() {
    const { user } = useAuth();
    return user.id


}