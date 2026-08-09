import { NextResponse } from "next/server";
import { getMovieById } from "../../../../lib/tmbd";

export async function POST(request) {

    try {

        const { movie } =
            await request.json();

        const movieDetail =
            await getMovieById(
                movie
            );

        return NextResponse.json({
            movie: movieDetail
        });

    } catch (error) {

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );

    }
}