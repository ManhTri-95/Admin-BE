const express = require('express');
const validate = require('../../middleware/validate');
const authValidation = require('../../validations/auth.validation');
const auth = require('../../middleware/auth');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.put('/signup', validate(authValidation.register), authController.signup)

router.post('/login', validate(authValidation.login), authController.login);

router.get('/user-info', auth(), authController.getUserInfo);
// router.get('/user-info', isAuth, authController.getUserInfo);

//router.get('/logout', isAuth, authController.logout);

router.post('/verify-token', authController.verifySignupSuccess);

router.post('/reset-password', validate(authValidation.forgotPassword), authController.postForgotPassword);

router.post('/set-newPassword', validate(authValidation.setNewPassword), authController.postSetNewPassword);
//router.post('/reset-password', [ validateEmail(), handleValidationErrors ], authController.resetPassword);

//router.post('/change-password', isAuth, [ validateChangePassword(), handleValidationErrors ], authController.changePassword)
router.get('/verify-token-reset-password', validate(authValidation.verifyTokenResetPassword), authController.getVerifyTokenResetPassword);

module.exports = router;