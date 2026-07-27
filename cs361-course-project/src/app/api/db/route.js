import { NextResponse } from "next/server";



export async function POST(request) {

    try {

        const { username, password} = await request.json();

        const result = await confirmAuthentication(username, password)

        return NextResponse.json(result);


    } catch (error) {

        console.error("DB route error:", error);


        return NextResponse.json(
            {
                error: "DB error"
            },
            {
                status: 500
            }
        );

    }
}