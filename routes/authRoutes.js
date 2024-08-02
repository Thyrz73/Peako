const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), authController.login);
router.post('/api/login', authController.apiLogin);

module.exports = router;
