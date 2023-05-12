const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const weatherUrl = process.env.REACT_APP_WEATHER_URL;
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const apiUrl = `${weatherUrl}/weather?q=${event.queryStringParameters.q}&appid=${weatherApiKey}&units=metric`;

    const response = await axios.get(apiUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};