import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Weather.css";

const API_KEY = "a232e49e1b3c28024458b2a8280f7071";

function Weather() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found");
        }
        throw new Error("Error fetching weather data");
      }

      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-header">
        <button onClick={() => navigate("/dashboard")} className="back-button">
          ← Back to Dashboard
        </button>
        <h1>Weather Widget</h1>
        <p className="subtitle">
          Get real-time weather information for any city
        </p>
      </div>

      <div className="weather-content">
        <div className="search-card">
          <h2>Search City</h2>
          <div className="search-box">
            <input
              type="text"
              className="city-input"
              placeholder="Enter city name (e.g., London, Tokyo)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={fetchWeather}
              className="search-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner-small"></div>
                  Searching...
                </>
              ) : (
                <>
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </>
              )}
            </button>
          </div>

          {API_KEY === "YOUR_API_KEY_HERE" && (
            <div className="api-warning">
              ⚠️ Please add your OpenWeatherMap API key in Weather.jsx
              <br />
              Get a free key at:{" "}
              <a
                href="https://openweathermap.org/api"
                target="_blank"
                rel="noopener noreferrer"
              >
                openweathermap.org/api
              </a>
            </div>
          )}
        </div>

        {loading && (
          <div className="weather-card loading-card">
            <div className="spinner"></div>
            <p>Fetching weather...</p>
          </div>
        )}

        {error && (
          <div className="weather-card error-card">
            <svg
              width="60"
              height="60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3>Oops!</h3>
            <p>{error}</p>
          </div>
        )}

        {weather && !loading && (
          <div className="weather-card result-card">
            <div className="weather-icon-container">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="weather-icon-large"
              />
            </div>

            <h2 className="city-name">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="weather-description">
              {weather.weather[0].description}
            </p>

            <div className="temperature-display">
              <span className="temp-main">
                {Math.round(weather.main.temp)}°C
              </span>
              <div className="temp-details">
                <span>Feels like: {Math.round(weather.main.feels_like)}°C</span>
              </div>
            </div>

            <div className="weather-details-grid">
              <div className="detail-item">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
                <div>
                  <p className="detail-label">Humidity</p>
                  <p className="detail-value">{weather.main.humidity}%</p>
                </div>
              </div>

              <div className="detail-item">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                  />
                </svg>
                <div>
                  <p className="detail-label">Wind Speed</p>
                  <p className="detail-value">{weather.wind.speed} m/s</p>
                </div>
              </div>

              <div className="detail-item">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <div>
                  <p className="detail-label">Pressure</p>
                  <p className="detail-value">{weather.main.pressure} hPa</p>
                </div>
              </div>

              <div className="detail-item">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <div>
                  <p className="detail-label">Visibility</p>
                  <p className="detail-value">
                    {(weather.visibility / 1000).toFixed(1)} km
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!weather && !loading && !error && (
          <div className="weather-card empty-card">
            <svg
              width="80"
              height="80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            <h3>Search for a city</h3>
            <p>Enter a city name above to get weather information</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
