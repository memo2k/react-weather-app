import { useState } from "react";
import "./assets/styles/style.scss";
import Forecast from "./components/Forecast/Forecast";
import Search from './components/Search/Search';
import Weather from "./components/Weather/Weather";

import clearSky from './assets/images/clear-sky.jpg';
import cloudsImage from './assets/images/clouds.jpg';
import rainImage from './assets/images/rain.jpg';
import fewClouds from './assets/images/few-clouds.jpg';
import lightRain from './assets/images/light-rain.jpg';
import overcastClouds from './assets/images/overcast-clouds.jpg';

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [bgImage, setBgImage] = useState(null);

  const handleSearchChange = (input) => {
    fetch(`http://localhost:5000/weather?q=${input}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const weatherDescription = data.weather[0].description;

        if (weatherDescription === "light rain") {
          setBgImage(lightRain);
        } else if (weatherDescription === "few clouds") {
          setBgImage(fewClouds);
        } else if (weatherDescription === "scattered clouds" ||
          weatherDescription === "broken clouds") {
          setBgImage(cloudsImage);
        } else if (weatherDescription === "rain" ||
          weatherDescription === "thunderstorm") {
          setBgImage(rainImage)
        } else if (weatherDescription === "overcast clouds") {
          setBgImage(overcastClouds);
        } else if (weatherDescription === "clear sky") {
          setBgImage(clearSky);
        }

        setCurrentWeatherData(data);
      })
      .catch((err) => {
        console.error(err);
      });

      const lat = currentWeatherData.coord.lat;
      const lon = currentWeatherData.coord.lon;
      const timezone = new Date().getTimezoneOffset() / 60 - lon / 15;
      const timezoneHours = timezone.toFixed(2);

    fetch(`http://localhost:5000/forecast?q=${input}&lat=${lat}&lon=${lon}&timezone=${timezoneHours}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const groupedData = data.list.reduce((acc, forecast) => {
          const date = forecast.dt_txt.split(' ')[0];
          if (acc[date]) {
            acc[date].push(forecast);
          } else {
            acc[date] = [forecast];
          }
          return acc;
        }, {});

        const processedData = Object.keys(groupedData)
          .filter((date) => date !== data.list[0].dt_txt.split(' ')[0])
          .map(date => {
            const forecasts = groupedData[date];
            const minTemp = Math.min(...forecasts.map((forecast) => forecast.main.temp));
            const maxTemp = Math.max(...forecasts.map((forecast) => forecast.main.temp));

            const dayForecast = forecasts.find((forecast) =>
              forecast.dt_txt.includes("9:00:00")
            );

            const description = dayForecast?.weather[0].description.charAt(0).toUpperCase() + dayForecast?.weather[0].description.slice(1);
            const humidity = dayForecast?.weather[0].main?.humidity;
            const windSpeed = dayForecast?.weather[0].wind?.speed;
            const clouds = dayForecast?.clouds?.all;
            const weatherIcon = dayForecast?.weather[0].icon;

            return {
              date: date,
              minTemp: minTemp,
              maxTemp: maxTemp,
              description: description,
              humidity: humidity,
              windSpeed: windSpeed,
              weatherIcon: weatherIcon,
              clouds: clouds
            }
          });

        setForecastData(processedData);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="wrapper" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${bgImage})` }}>
      <Search onSearchChange={handleSearchChange} />
      {currentWeatherData && <Weather data={currentWeatherData} />}
      {forecastData && <Forecast data={forecastData} />}
    </div>
  );
}

export default App;
