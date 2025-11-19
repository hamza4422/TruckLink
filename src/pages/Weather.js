import React, { useState, useEffect, useContext } from "react";
import "../styles/Weather.css";
import { LanguageContext } from "../components/LanguageContext";
import weatherText from "../translations/weatherText";

const API_KEY = process.env.REACT_APP_WEATHER_KEY;

const Weather = () => {
  const { lang } = useContext(LanguageContext);
  const t = weatherText[lang]; // النصوص الجاهزة
  const [selectedCity, setSelectedCity] = useState("beirut");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  console.log("API KEY:", API_KEY);

  const fetchWeather = async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName},LB&appid=${API_KEY}&units=metric&lang=${lang}`
      );

      const data = await res.json();
      if (data.cod !== 200) {
        setError(t.error);
        setWeather(null);
        return;
      }

      setWeather(data);
      setError("");
    } catch {
      setError(t.error);
    }
  };

  useEffect(() => {
    const cityName = t.cities[selectedCity];
    fetchWeather(cityName);
  }, [lang]);

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    fetchWeather(t.cities[newCity]);
  };

  return (
    <div className="weather-container">

      <h1 className="weather-title">{t.title}</h1>

      <select className="weather-select" value={selectedCity} onChange={handleCityChange}>
        {Object.keys(t.cities).map((key) => (
          <option value={key} key={key}>
            {t.cities[key]}
          </option>
        ))}
      </select>

      {error && <p className="weather-error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icon"
          />

          <h2 className="temp">{weather.main.temp}°C</h2>
          <p className="desc">{weather.weather[0].description}</p>

          <div className="details">
            <p>{t.wind}: {weather.wind.speed} km/h</p>
            <p>{t.humidity}: {weather.main.humidity}%</p>
            <p>{t.feels}: {weather.main.feels_like}°C</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Weather;
