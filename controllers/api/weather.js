const fetchWeatherData = require('../../models/weather');

module.exports = {
  getWeather
};

async function getWeather(req, res) {
  try {
    const weatherData = await fetchWeatherData(req.params.location);
    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
