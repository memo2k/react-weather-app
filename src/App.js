import { useState } from "react";
import "./assets/styles/style.scss";
import Forecast from "./components/Forecast/Forecast";
import Search from './components/Search/Search';
import Weather from "./components/Weather/Weather";

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const handleSearchChange = (input) => {
    fetch(`http://localhost:5000/weather?q=${input}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCurrentWeatherData(data);
      })
      .catch((err) => {
        console.error(err);
      });

    fetch(`http://localhost:5000/forecast?q=${input}`)
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
            forecast.dt_txt.includes("12:00:00")
          );

          const description = dayForecast?.weather[0].description.charAt(0).toUpperCase() + dayForecast?.weather[0].description.slice(1);
          const humidity = dayForecast?.weather[0].main?.humidity;
          const windSpeed = dayForecast?.weather[0].wind?.speed;
          const weatherIcon = dayForecast?.weather[0].icon;

          return {
            date: date,
            minTemp: minTemp,
            maxTemp: maxTemp,
            description: description,
            humidity: humidity,
            windSpeed: windSpeed,
            weatherIcon: weatherIcon
          }
        });

        setForecastData(processedData);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="wrapper">
      <Search onSearchChange={handleSearchChange} />
      {currentWeatherData && <Weather data={currentWeatherData} />}
      {forecastData && <Forecast data={forecastData} />}
    </div>
  );
}

export default App;
