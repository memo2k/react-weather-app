import React from 'react';
import "./weather.scss";

const Weather = ({ data }) => {
  return (
    <section className='weather'>
      <div className="shell">
        <div className="weather__inner">
          <div className="weather__top">
            <h1>{data.name}, {data.sys.country}</h1>

            {/* <h3>Monday 28 August</h3> */}
          </div>

          <div className="weather__bottom">
            <div className="weather__temperature">
              <div className="weather__temperature-icon">
                <img src={`/icons/${data.weather[0].icon}.png`} alt="" width="200" height="200" />
              </div>

              <div className="weather__temperature-details">
                <h1>{Math.round(data.main.temp)}°C</h1>

                <p>{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</p>
              </div>
            </div>

            <div className="weather__details">
              <div className="grid">
                <div className="grid__col grid__col--1of3">
                  <div className="card-weather">
                    <div className="card__details">
                      <h3>{Math.round(data.main.temp_max)}°C</h3>
                      <p>High</p>
                    </div>
                  </div>
                </div>

                <div className="grid__col grid__col--1of3">
                  <div className="card-weather">
                    <div className="card__details">
                      <h3>{Math.round(data.wind.speed * 3.6)} km/h</h3>
                      <p>Wind Speed</p>
                    </div>
                  </div>
                </div>

                <div className="grid__col grid__col--1of3">
                  <div className="card-weather">
                    <div className="card__details">
                      <h3>{data.main.humidity}%</h3>
                      <p>Humidity</p>
                    </div>
                  </div>
                </div>

                <div className="grid__col grid__col--1of3">
                  <div className="card-weather">
                    <div className="card__details">
                      <h3>{Math.round(data.main.temp_min)}°C</h3>
                      <p>Low</p>
                    </div>
                  </div>
                </div>

                <div className="grid__col grid__col--1of3">
                  <div className="card-weather">
                    <div className="card__details">
                      <h3>{data.clouds.all}%</h3>
                      <p>Clouds</p>
                    </div>
                  </div>
                </div>

                <div className="grid__col grid__col--1of3">
                  <div className="card-weather">
                    <div className="card__details">
                      <h3>{Math.round(data.main.feels_like)}°C</h3>
                      <p>Feels like</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Weather