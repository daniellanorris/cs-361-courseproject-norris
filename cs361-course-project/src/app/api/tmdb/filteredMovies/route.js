import { NextResponse } from "next/server";
import { getMovieAndKeywords } from "../../../../lib/tmbd";

export async function POST(request) {

    try {

        const { movieIdList, selectedKeywords } =
            await request.json();

        const matchingMovies =
            await getMovieAndKeywords(
                movieIdList,
                selectedKeywords
            );

        return NextResponse.json({
            movies: matchingMovies
        });

    } catch (error) {

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );

    }
}