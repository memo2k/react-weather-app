const axios = require('axios');
require('dotenv').config();

const weatherUrl = process.env.REACT_APP_WEATHER_URL;
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

exports.handler = async function (event, context) {
  try {
    const { queryStringParameters } = event;
    const apiUrl = `${weatherUrl}/forecast?q=${queryStringParameters.q}&appid=${weatherApiKey}&units=metric`;

    const response = await axios.get(apiUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};