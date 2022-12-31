
/*control C to leave netlify dev*/

const movieButton = document.getElementById('movie-button');
const tvButton = document.getElementById('tv-button');
let mediaType = "";


/* Retrieve movie list with API call*/

const getMovies = async() => {
    
    let media = 'movie';

    try {
        const response = await fetch(`/.netlify/functions/api?media=${media}`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const movies = jsonResponse.results;
                mediaType = "movie";
                return movies;
            }

    } catch (e) {
        console.log(e);
    }
};

/* Retrieve TV show list with API call*/

const getTvShows = async() => {
    
    let media = 'tv';

    try {
        const response = await fetch(`/.netlify/functions/api?media=${media}`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const tvShows = jsonResponse.results;
                retrieveButton.innerHTML = "Display TV Shows";
                mediaType = "tv";
                return tvShows;
            }

    } catch (e) {
        console.log(e);
    }
};



/* Get a random movie from the movie list */

const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * 20);
    const randomMovie = movies[randomIndex];
    return randomMovie;
}

/* Get a random TV show from the TV show list */

const getRandomTvShow = (tvShows) => {
    const randomIndex = Math.floor(Math.random() * 20);
    const randomTvShow = tvShows[randomIndex];
    return randomTvShow;
}


/* Create HTML for movie poster */

const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');

    return posterImg;
}

/* Create HTML for movie title */

const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h2');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;

    return titleHeader;
}

/* Create HTML for movie overview */

const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;

    return overviewParagraph;
}

/* Clear the current movie from the screen */

const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
}

/* Create HTML to display the random movie */

const displayMovie = async () => {
    
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');

    const movieInfo = document.getElementById("movieInfo");
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    }

    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);

    const moviePoster = createMoviePoster(randomMovie.poster_path);
    const titleHeader = createMovieTitle(randomMovie.title);
    const overviewText = createMovieOverview(randomMovie.overview);

    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);
}


/*Event listeners for Movie & TV Show buttons for movie data retrieval using API*/

movieButton.addEventListener('click', displayMovie);
tvButton.addEventListener('click', getTvShows);