import { useEffect, useState } from "react";
import "./assets/styles/style.scss";
import Forecast from "./components/Forecast/Forecast";
import Search from './components/Search/Search';
import Weather from "./components/Weather/Weather";

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [bgColor, setBgColor] = useState(null);

  const fetchWeather = (input) => {
    fetch(`http://localhost:5000/weather?q=${input}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const weatherDescription = data.weather[0].description;

        if (weatherDescription === "light rain") {
          setBgColor("gray-bg");
        } else if (weatherDescription === "few clouds") {
          setBgColor("blue-bg");
        } else if (weatherDescription === "scattered clouds" ||
          weatherDescription === "broken clouds") {
          setBgColor("blue-bg");
        } else if (weatherDescription === "rain" ||
          weatherDescription === "thunderstorm") {
          setBgColor("gray-bg");
        } else if (weatherDescription === "overcast clouds") {
          setBgColor("gray-bg");
        } else if (weatherDescription === "clear sky") {
          setBgColor("blue-bg");
        }

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
              forecast.dt_txt.includes("9:00:00")
            );

            const description = dayForecast?.weather[0].description.charAt(0).toUpperCase() + dayForecast?.weather[0].description.slice(1);
            const clouds = dayForecast?.clouds?.all;
            const weatherIcon = dayForecast?.weather[0].icon;

            return {
              date: date,
              minTemp: minTemp,
              maxTemp: maxTemp,
              description: description,
              weatherIcon: weatherIcon,
              clouds: clouds,
            }
          });

        setForecastData(processedData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchWeather("Sofia");
  }, []);

  const handleSearchChange = (input) => {
    fetchWeather(input);
  }

  return (
    <div className={`wrapper ${bgColor}`}>
      <Search onSearchChange={handleSearchChange} />
      {currentWeatherData && <Weather data={currentWeatherData} />}
      {forecastData && <Forecast data={forecastData} />}
    </div>
  );
}

export default App;
