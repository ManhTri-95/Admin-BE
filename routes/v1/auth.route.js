const express = require('express');
const validate = require('../../middleware/validate');
const authValidation = require('../../validations/auth.validation');
//const isAuth = require('../../middleware/is-auth');

// const { validateEmail, validatePassword } = require('../../validators/commonValidators');
// const validateLogin = require('../../validators/loginValidations');
//const validateSignup = require('../../validators/signupValidators');
//const handleValidationErrors = require('../../middleware/validationErrorMiddleware');
// const validateChangePassword = require('../../validators/changePasswordValidators');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

//router.put('/signup', [ validateSignup(), handleValidationErrors ], authController.signup);
router.put('/signup', authController.signup)

router.post('/login', validate(authValidation.login), authController.login);

//router.get('/user-info', isAuth, authController.getUserInfo);

//router.get('/logout', isAuth, authController.logout);

//router.post('/verify-token', authController.verifyToken);

//router.post('/reset-password', [ validateEmail(), handleValidationErrors ], authController.resetPassword);

//router.post('/change-password', isAuth, [ validateChangePassword(), handleValidationErrors ], authController.changePassword)

module.exports = router;