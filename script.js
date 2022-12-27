
/*control C to leave netlify dev*/

const movieButton = document.getElementById('movie-button');
const tvButton = document.getElementById('tv-button');
const retrieveButton = document.getElementById('retrieve-button');
const formLabel = document.getElementById('form-label');
retrieveButton.innerHTML = "Display Shows";
formLabel.innerHTML = "Choose a genre:";

/* Populate genre selector dropdown list for movie or tv genres*/

const populateGenreSelector = (genres) => {
    const select = document.getElementById('genres')

    while (select.hasChildNodes()) {
        select.removeChild(select.firstChild);
    }

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

/* Retrieve movie genres with API call*/

const getMovieGenres = async() => {
    
    let media = 'movie';

    try {
        const response = await fetch(`/.netlify/functions/api?media=${media}`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const genres = jsonResponse.genres;
                populateGenreSelector(genres);
                formLabel.innerHTML = "Choose a movie genre:";
                retrieveButton.innerHTML = "Display Movies";
            }

    } catch (e) {
        console.log(e);
    }
};

/* Retrieve TV genres with API call*/

const getTvGenres = async() => {
    
    let media = 'tv';

    try {
        const response = await fetch(`/.netlify/functions/api?media=${media}`);
            if (response.ok) {
                const jsonResponse = await response.json();
                const genres = jsonResponse.genres;
                populateGenreSelector(genres);
                formLabel.innerHTML = "Choose a TV show genre:";
                retrieveButton.innerHTML = "Display TV Shows";
            }

    } catch (e) {
        console.log(e);
    }
};

/*Event listeners for Movie & TV Show buttons for genre retrieval using API*/

movieButton.addEventListener('click', getMovieGenres);
tvButton.addEventListener('click', getTvGenres);
