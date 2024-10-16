const httpStatus = require('http-status');
const { authService, tokenService, mailService, emailService } = require('../services');
const { createResponse, catchAsync } = require('../utils/catchAsync');


const login = catchAsync(async(req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user)
    const response = createResponse(200, 'Login successful', { userId: user._id , token: tokens.token });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

const signup = catchAsync(async (req, res, next) => {
  const { email, firstName, lastName, phone } = req.body;
  const token = await authService.singupUser(email, firstName, lastName, phone);
  const response = createResponse(200, 'Signup successful', { token: token });
  res.status(200).json(response);
});


const verifySignupSuccess = catchAsync(async (req, res) => {
  const token = req.body.token;
  await authService.verifySignupSuccess(token);
  const response = createResponse(200, 'Token is valid');
  res.status(200).json(response);
});

const getUserInfo = catchAsync(async (req, res) => {
  const user = req.user;
  const response = createResponse(200, 'Login success', user);
  res.status(200).json(response);
});


const postForgotPassword = catchAsync(async (req, res) => {
  const domainFromFE = req.get('Origin');
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordUser(resetPasswordToken.userInfo, resetPasswordToken.tokenResetPassword, domainFromFE);
  res.status(200).json(resetPasswordToken)
});

const postSetNewPassword = catchAsync(async (req, res) => {
  console.log(req.body);
  const { newPassword, confirmPassword } = req.body;
  const response = createResponse(200, 'NewPassord setup successful');
  res.status(200).json(response);
});

module.exports = {
  login,
  signup,
  verifySignupSuccess,
  getUserInfo,
  postForgotPassword,
  postSetNewPassword
}
