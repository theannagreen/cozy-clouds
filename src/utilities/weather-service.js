const axios = require("axios");
require("dotenv").config();

// retrieve api key from environment variables
const apiKey = process.env.OPENWEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast";

// fetch weather date from OpenWeatherMap api
async function fetchWeatherData(location) {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: location,
        appid: apiKey,
        units: "imperial",
      },
    });

    //extract relevant date from api response
    const { main, weather, name } = response.data;
    const temperature = main.temp;
    const description = weather[0].description;

    return { name, temperature, description };
  } catch (err) {
    throw new Error("Error fetching weather data");
  }
}

async function fetchWeatherForecast(location) {
  try {
    const response = await axios.get(forecastApiUrl, {
      params: {
        q: location,
        appid: apiKey,
        units: "imperial",
      },
    });

    const forecastData = response.data.list;
    const dailyForecast = {};

    forecastData.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      if (!dailyForecast[date]) {
        dailyForecast[date] = [];
      }
      dailyForecast[date].push(entry);
    });

    const limitedForecast = Object.keys(dailyForecast)
    .slice(0,5)
    .reduce((result, key) => {
      result[key] = dailyForecast[key];
      return result;
    }, {});

    return limitedForecast;
  } catch (err) {
    throw new Error("Error fetching forecast data");
  }
}

module.exports = { fetchWeatherData, fetchWeatherForecast };
