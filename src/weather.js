import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css';
import { FaSearch } from 'react-icons/fa';

const API_KEY = "abf30ecb6867e50754814ffc38f9da9d";

const Weather = () => {
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (city) fetchWeather(city);
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      localStorage.setItem("lastCity", cityName);
    } catch (error) {
      alert("City not found!");
      setWeather(null);
    }
  };

  const handleSearch = () => {
    if (city.trim()) fetchWeather(city);
  };

  return (
    <div className="app-container">
      <div className="weather-container">
        <h2 className="heading">Clima Glow</h2>
        <div className="search-box">
          <input
            type="text"
            value={city}
            placeholder="Enter city..."
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}><FaSearch /></button>
        </div>

        {weather && (
          <div className="weather-info">
            <h3 className="location">{weather.name}, {weather.sys.country}</h3>
            <p className="desc">{weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
            />
            <h1 className="temp">{Math.round(weather.main.temp)}°C</h1>
            <div className="details">
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>🌬️ Wind: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
