const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


// POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);
//ensureloggedin middleware 
router.get('/profile', ensureLoggedIn, (req, res) => {
    res.json(req.user);
})

// GET / ensure login 
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
