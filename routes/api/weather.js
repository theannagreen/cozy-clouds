const express = require('express');
const router = express.Router();
const weatherController = require('../../controllers/api/weather');

router.get('/weather/:location', weatherController.getWeather);

// Export the router
module.exports = router;
