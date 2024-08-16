const express = require('express');
const isAuth = require('../middleware/is-auth');

const { validateEmail, validatePassword } = require('../validators/commonValidators');
const validateLogin = require('../validators/loginValidations');
const validateSignup = require('../validators/signupValidators');
const handleValidationErrors = require('../middleware/validationErrorMiddleware');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', [ validateSignup(), handleValidationErrors ] ,authController.signup);

router.post('/login', [ validateLogin(), handleValidationErrors ], authController.login);

router.get('/user-info', isAuth, authController.getUserInfo);

router.get('/logout', isAuth, authController.logout);

router.post('/verify-token', authController.verifyToken);

router.post('/reset-password', [ validateEmail(), handleValidationErrors ], authController.resetPassword);

module.exports = router;