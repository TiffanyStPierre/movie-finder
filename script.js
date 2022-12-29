
/*control C to leave netlify dev*/

const movieButton = document.getElementById('movie-button');
const tvButton = document.getElementById('tv-button');
const retrieveButton = document.getElementById('retrieve-button');
let mediaType = "";
retrieveButton.innerHTML = "Display Shows";

/* Retrieve movie list with API call*/

const getMovies = async() => {
    
    let media = 'movie';

    try {
        const response = await fetch(`/.netlify/functions/api?media=${media}`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const movies = jsonResponse.results;
                retrieveButton.innerHTML = "Display Movies";
                mediaType = "movie";
                console.log(movies);
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
                console.log(tvShows);
            }

    } catch (e) {
        console.log(e);
    }
};

/*Event listeners for Movie & TV Show buttons for genre retrieval using API*/

movieButton.addEventListener('click', getMovies);
tvButton.addEventListener('click', getTvShows);


