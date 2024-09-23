const httpStatus = require('http-status');
const { authService, tokenService } = require('../services');
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
  try {
    await authService.singupUser(email, firstName, lastName, phone);
    const token = await tokenService.generateSignupSuccessToken();

    const response = createResponse(200, 'Signup successful', { token: token });
    res.status(200).json(response);
  } catch (error) { 
    return next(error);
  }  
});


module.exports = {
  login,
  signup
}
