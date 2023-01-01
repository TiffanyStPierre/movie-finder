
/*control C to leave netlify dev*/

const movieButton = document.getElementById('movie-button');
const tvButton = document.getElementById('tv-button');

/* Retrieve movie list with API call*/

const getMovies = async() => {

    try {
        const response = await fetch('/.netlify/functions/api?media=movie');
            if (response.ok) {
                const jsonResponse = await response.json();
                const movies = jsonResponse.results;
                return movies;
            }

    } catch (e) {
        console.log(e);
    }
};

/* Retrieve TV show list with API call*/

const getTvShows = async() => {

    try {
        const response = await fetch('/.netlify/functions/api?media=tv');
            if (response.ok) {
                const jsonResponse = await response.json();
                const tvShows = jsonResponse.results;
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

/* Create HTML for movie rating */

const createMovieRating = (vote_average) => {
    const ratingParagraph = document.createElement('p');
    ratingParagraph.setAttribute('id', 'movieRating');
    ratingParagraph.innerHTML = `Average Viewer Rating: ${vote_average}/10`;

    return ratingParagraph;
}

/* Create HTML for movie release date */

const createMovieReleaseDate = (release_date) => {
    const releaseDateParagraph = document.createElement('p');
    releaseDateParagraph.setAttribute('id', 'movieReleaseDate');
    releaseDateParagraph.innerHTML = `Release Date: ${release_date}`;

    return releaseDateParagraph;
}

/* Create HTML for media type */

const createMediaType = (type) => {
    const mediaTypeParagraph = document.createElement('p');
    mediaTypeParagraph.setAttribute('id', 'mediaType');
    mediaTypeParagraph.innerHTML = type;

    return mediaTypeParagraph;
}

/* Create HTML for TV show name */

const createTvShowName = (name) => {
    const nameHeader = document.createElement('h2');
    nameHeader.setAttribute('id', 'tvShowName');
    nameHeader.innerHTML = name;

    return nameHeader;
}

/* Create HTML for TV show first air date */

const createFirstAirDate = (first_air_date) => {
    const firstAirDateParagraph = document.createElement('p');
    firstAirDateParagraph.setAttribute('id', 'firstAirDate');
    firstAirDateParagraph.innerHTML = `First Air Date: ${first_air_date}`;

    return firstAirDateParagraph;
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
    const mediaType = createMediaType("Movie");
    const overviewText = createMovieOverview(randomMovie.overview);
    const ratingText = createMovieRating(randomMovie.vote_average);
    const releaseDateText = createMovieReleaseDate(randomMovie.release_date);

    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(mediaType);
    movieTextDiv.appendChild(overviewText);
    movieTextDiv.appendChild(ratingText);
    movieTextDiv.appendChild(releaseDateText);
}

/* Create HTML to display the random TV show */

const displayTvShow = async () => {
    
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');

    const movieInfo = document.getElementById("movieInfo");
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    }

    const tvShows = await getTvShows();
    const randomTvShow = getRandomTvShow(tvShows);

    const moviePoster = createMoviePoster(randomTvShow.poster_path);
    const nameHeader = createTvShowName(randomTvShow.name);
    const mediaType = createMediaType("TV Show");
    const overviewText = createMovieOverview(randomTvShow.overview);
    const ratingText = createMovieRating(randomTvShow.vote_average);
    const firstAirDateText = createFirstAirDate(randomTvShow.first_air_date);

    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(nameHeader);
    movieTextDiv.appendChild(mediaType);
    movieTextDiv.appendChild(overviewText);
    movieTextDiv.appendChild(ratingText);
    movieTextDiv.appendChild(firstAirDateText);
}


/*Event listeners for Movie & TV Show buttons for movie data retrieval using API*/

movieButton.addEventListener('click', displayMovie);
tvButton.addEventListener('click', displayTvShow);