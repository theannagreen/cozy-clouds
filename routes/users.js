const express = require('express');
const router = express.Router();
const usersCtrl = require('../../../api/users');
const ensureLoggedIn = require('../../../config/ensureLoggedIn');


// POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);

router.get('/check-tocken', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;