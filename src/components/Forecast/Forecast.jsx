import React from 'react';
import "./forecast.scss";

const weekDaysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();

  // Get an array of the forecast days starting from the current day
  const forecastDays = weekDaysList.slice(dayInAWeek, weekDaysList.length).concat(weekDaysList.slice(0, dayInAWeek));

  return (
    <div className="forecast">
      <div className="shell">
        <div className="forecast__inner">
          {data.filter(item => item.weatherIcon != null).map((item, idx) => {
            return (
              <div className="card-forecast" key={idx}>
                <div className="card__left">
                  <div className="card__day">
                    <h2>{forecastDays[idx]}</h2>
                  </div>

                  <div className="card__temperature">
                    <div className="card__image">
                      <img src={`/icons/${item.weatherIcon}.png`} alt="" />
                    </div>
                    <h1>{Math.round(item.maxTemp)}°C</h1>
                    <p>/{Math.round(item.minTemp)}°C</p>
                  </div>

                  <div className="card__description">
                    <h2>{item.description}</h2>
                  </div>
                </div>

                <div className="card__clouds">
                  <i className="fa-solid fa-cloud fa-lg"></i>
                  <p>{item.clouds}%</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Forecast