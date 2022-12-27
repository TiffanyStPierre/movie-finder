// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const axios = require('axios');

const handler = async (event) => {
    const {media} = event.queryStringParameters
    const baseUrl = "https://api.themoviedb.org/3"

    const API_SECRET = process.env.API_SECRET
    const url = `${baseUrl}/genre/${media}/list?api_key=${API_SECRET}`;

    try {
      const { data } = await axios.get(url)

      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }

    } catch (error) {
      const { status, statusText, headers, data } = error.response;
      return {
        statusCode: status,
        body: JSON.stringify({status, statusText, headers, data})
      }
    }

  /*try {
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }*/
}

module.exports = { handler }