const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const weatherUrl = process.env.REACT_APP_WEATHER_URL;
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

const app = express();

app.use(express.static('build'));

app.get('/api/weather', async (req, res) => {
    const apiUrl = `${weatherUrl}/weather?q=${req.query.q}&appid=${weatherApiKey}&units=metric`;

    await axios.get(apiUrl).then((response) => {
        res.json(response.data);
    })
    .catch((err) => {
        res.status(500).json(err);
    })
});

app.get('/api/forecast', async (req, res) => {
    const apiUrl = `${weatherUrl}/forecast?q=${req.query.q}&appid=${weatherApiKey}&units=metric`;

    await axios.get(apiUrl).then((response) => {
        res.json(response.data);
    })
    .catch((err) => {
        res.status(500).json(err);
    })
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));