const express = require('express');
const router = express.Router();
const weatherCtrl = require('../../controllers/api/weather');

router.get('/:location', weatherCtrl.getWeather);
router.get('/5-day-forecast/:location', weatherCtrl.get5DayForecast);
router.post('/multiple', weatherCtrl.getWeatherForMultipleLocations); // Add this line

module.exports = router;
