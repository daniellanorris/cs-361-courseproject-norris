import { NextResponse } from "next/server";

import { 
    getMoviesToFilter, 
    getRandom250keywords 
} from "../../../lib/tmbd";


export async function GET() {

    try {

        const movieIdList = await getMoviesToFilter();

        const movieKeywords = await getRandom250keywords(
            movieIdList
        );


        return NextResponse.json({

            movieIdList,

            movieKeywords

        });


    } catch(error) {


        console.error(error);


        return NextResponse.json(
            {
                error: error.message
            },
            {
                status:500
            }
        );

    }

}