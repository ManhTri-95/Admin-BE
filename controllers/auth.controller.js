const httpStatus = require('http-status');
const { authService } = require('../services');
const { createResponse, catchAsync } = require('../utils/catchAsync');


const login = catchAsync(async(req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);

  const response = createResponse({ user }, 'Login successful');
  res.status(200).json(response);
});

module.exports = {
  login
}
