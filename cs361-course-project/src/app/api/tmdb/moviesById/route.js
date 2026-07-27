import { NextResponse } from "next/server";
import { getMoviesById} from "../../../../lib/tmbd";

export async function POST(request) {

    try {

        const { movieList } =
            await request.json();

        const matchingMovies =
            await getMoviesById(
              movieList
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