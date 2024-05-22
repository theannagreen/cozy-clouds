const express = require('express');
const router = express.Router();
const weatherController = require('../../controllers/api/weather');

router.get('/:location', weatherController.getWeather);

module.exports = router;
