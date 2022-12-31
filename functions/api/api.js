// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const axios = require('axios');

const handler = async (event) => {
    const {media} = event.queryStringParameters
    const baseUrl = "https://api.themoviedb.org/3"

    const API_SECRET = process.env.API_SECRET
    const url = `${baseUrl}/trending/${media}/week?api_key=${API_SECRET}`;

    try {
      const { data } = await axios.get(url)

      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }

    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({error: 'Failed fetching data'})
      };
    }

};

module.exports = { handler }
