import React, { useState } from 'react';

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const GetDate = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} - ${month} ${date}, ${year}`;
  }

  const IsDaylight = (d) => {
    if (typeof weather.main == "undefined")
      return false;
    return weather.dt < weather.sys.sunrise;
  }

  const IsCloudy = () => {
    if (typeof weather.main == "undefined")
      return false;
    return weather.weather[0].main == "Clouds" || weather.weather[0].main == "Snow" || weather.weather[0].main == "Rain";
  }

  const IsSnowy = () => {
    if (typeof weather.main == "undefined")
      return false;
    return weather.weather[0].main == "Snow";
  }

  const IsRaining = () => {
    if (typeof weather.main == "undefined")
      return false;
    return weather.weather[0].main == "Rain";
  }

  return (
    <div className="app">
        <div className="weather-container">
          <div className={IsDaylight() ? "weather-img background night" : "weather-img background"}></div>
          <div className={IsSnowy() ? "weather-img trees snowy" : "weather-img trees"}></div>
          <div className={IsSnowy() ? "weather-img ground snowy" : "weather-img ground"}></div>
          <div className={!IsDaylight() ? "weather-img sun" : "weather-img sun moon"}></div>
          <div className={IsCloudy() ? "weather-img clouds" : "weather-img"}></div>
          <div className={IsRaining() ? "weather-img rain" : ""}></div>
        </div>
        <main className={IsDaylight() ? "font-light" : "font-dark"}>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search"
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
          <div className="info-container">
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{GetDate(new Date())}</div>
              </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°F
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
          ) : ("")}
        </main>
    </div>
  );
}

export default App;
