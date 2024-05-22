const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const fetchWeatherData = require('../../src/utilities/weather-service');

module.exports = {
  create,
  login,
  checkToken,
  getWeather
};

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    const token = createJWT(user);
    const weatherData = await fetchWeatherData('New York'); // made NY the default but can be changed 
    res.json({ token, weatherData });
  } catch (err) {
    console.error('Error during user creation:', err)
    res.status(400).json('Bad Credentials');
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    const weatherData = await fetchWeatherData('New York'); // fetching data from default city 
    res.json({ token, weatherData });
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

async function getWeather(req, res) {
  try {
    const weatherData = await fetchWeatherData(req.params.location); // Assuming the location is passed as a route parameter
    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}