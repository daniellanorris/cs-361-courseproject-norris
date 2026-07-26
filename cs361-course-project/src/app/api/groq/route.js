import { NextResponse } from "next/server";
import { filterKeywordsByMood } from "../../../lib/groq";


export async function POST(request) {

    try {

        const { movieIdList, selectedMood } = await request.json();


        if (!movieIdList || movieIdList.length === 0) {

            return NextResponse.json(
                {
                    error: "Movie list is required."
                },
                {
                    status: 400
                }
            );
        }


        if (!selectedMood) {

            return NextResponse.json(
                {
                    error: "Mood selection is required."
                },
                {
                    status: 400
                }
            );
        }


        const result = await filterKeywordsByMood(
            movieIdList,
            selectedMood
        );


        return NextResponse.json(result);


    } catch (error) {

        console.error("Groq route error:", error);


        return NextResponse.json(
            {
                error: "Failed to generate keywords."
            },
            {
                status: 500
            }
        );

    }
}