const {fetchWeatherData, fetchWeatherForecast} = require('../../src/utilities/weather-service');

module.exports = {
  getWeather,
  get5DayForecast
};

async function getWeather(req, res) {
  try {
    const weatherData = await fetchWeatherData(req.params.location);
    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function get5DayForecast(req, res) {
  try {
    const forecastData = await fetchWeatherForecast(req.params.location);
    res.json(forecastData);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
