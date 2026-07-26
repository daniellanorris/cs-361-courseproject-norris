import axios from "axios";


export async function getMoviesToFilter() {

    const movieIdList = [];

    for (let i = 0; i < 75; i++) {

        const randomPage = Math.floor(Math.random() * 500) + 1;
        const randomMovie = Math.floor(Math.random() * 10);

        try {

            const response = await axios.get(
                "https://api.themoviedb.org/3/discover/movie",
                {
                    headers: {
                        Authorization: `Bearer ${process.env.MOVIE_DB_API_KEY}`,
                        Accept: "application/json",
                    },
                    params: {
                        page: randomPage
                    }
                }
            );


            const movie = response.data.results[randomMovie];

            if (movie) {
                movieIdList.push(movie.id);
            }


        } catch(error) {

            console.error(error);
            throw error;

        }

    }


    return movieIdList;

}



export async function getRandom250keywords(movieIdList) {

    const keywords = [];

    for(let i = 0; i < 25; i++) {

        const randomMovie =
            movieIdList[
                Math.floor(Math.random() * movieIdList.length)
            ];


        try {

            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${randomMovie}/keywords`,
                {
                    headers:{
                        Authorization:
                        `Bearer ${process.env.MOVIE_DB_API_KEY}`,
                    }
                }
            );


            const movieKeywords = response.data.keywords;


            if(movieKeywords.length === 0) {
                continue;
            }


            const keyword =
                movieKeywords[
                    Math.floor(
                        Math.random() * movieKeywords.length
                    )
                ];


            keywords.push(keyword.name);


        } catch(error) {

            console.error(error);

        }

    }


    return keywords;

}