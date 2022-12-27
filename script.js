
const media = 'movie';

fetch(`/.netlify/functions/api?media=${media}`)
    .then(res => {console.log(res.json())});