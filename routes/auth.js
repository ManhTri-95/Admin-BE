const express = require('express');
const isAuth = require('../middleware/is-auth');

const authController = require('../controllers/auth');
const router = express.Router();

router.put('/signup', authController.signup);

router.post('/login', authController.login);

router.get('/user-info', isAuth, authController.getUserInfo);

router.get('/logout', isAuth, authController.logout);

router.post('/verify-token', authController.verifyToken);

router.post('/reset-password', authController.resetPassword);

module.exports = router;