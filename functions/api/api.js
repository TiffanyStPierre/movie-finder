// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const axios = require('axios');

exports.handler = async (event) => {
  const {media} = event.queryStringParameters;

  const API_SECRET = process.env.API_SECRET;
  const url = `https://api.themoviedb.org/3/trending/${media}/week?api_key=${API_SECRET}`;
  
  try {
    const { data } = await axios.get(url);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (error) {
    if(error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }

};

