import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'ed0d71443b132520da33ee350a2afa9f'; 

  const getWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError(''); 
    } catch (err) {
      setError('City not found. Please try again.');
    }
  };

  return (
    <div className="weather-app">
      <div className="weather-header">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {weatherData && (
        <div className="weather-info">
          <div className="weather-location">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          </div>
          <div className="weather-details">
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            </div>
            <div className="weather-temp">
              <h1>{Math.round(weatherData.main.temp)}°C</h1>
              <p>{weatherData.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
