const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/users (create a user - sign up)
router.post("/", usersCtrl.create);
// POST /api/users/login
router.post("/login", usersCtrl.login);
//ensureloggedin middleware
router.get("/profile", ensureLoggedIn, (req, res) => {
  res.json(req.user);
});

// GET /api/users/weather/:location (ensure logged in)
router.get("/weather/:location", ensureLoggedIn, usersCtrl.getWeather);

module.exports = router;
