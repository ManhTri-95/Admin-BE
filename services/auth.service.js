
const httpStatus = require('http-status');
const userService = require('./user.service');
const emailService = require('./email.service');
const tokenService = require('./token.service');
const ApiError = require('../utils/ApiError');
const { User, Token } = require('../models')
// const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { tokenTypes } = require('../config/tokens');




/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
}

/**
 * 
 * @param {string} email 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {number} phone 
 * @returns {string}
 */
const singupUser = async(email, firstName, lastName, phone) => {
  const user = await userService.getUserByEmail(email);
  if (user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User already exists');
  }

  const password = crypto.randomBytes(5).toString('hex');
  console.log(password);
  const hashedPw = await bcrypt.hash(password, 12);
  const newUser = new User({
    email: email,
    password: hashedPw,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    position: '',
  });

  const savedUser = await newUser.save();

  const token = await tokenService.generateSignupSuccessToken(savedUser);
  await emailService.sendSignupSuccessUser(newUser, password);

  return token;
}

/**
 * @param {string} verifyEmailToken 
 * @returns {Promise}
 */

const verifySignupSuccess = async (verifyEmailToken) => {
  try {
    const verifySignupSuccessTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.SIGNUP_SUCCESS);
    const user = await userService.getUserById(verifySignupSuccessTokenDoc.user);
    await Token.deleteMany({ user: user._id, type: tokenTypes.SIGNUP_SUCCESS });

  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Token verification failed')
  }
}

/**
 * @param {string} id 
 * @returns {Promise}
 */
const getUserInfo = async (id) => {
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      throw new Error();
    }
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Login failed');
  }
}


/**
 * Verify reset Password token
 * @param {string}
 */
const verifySetNewPassword = async (verifySetPwToken) => {
  try {

  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Set newPassword verification failed');
  }
}



//verifyEmail('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmYyZTE1Mzk0ZGNjMDk4MDlhNDJmYjciLCJpYXQiOjE3MjcxOTM0MjcsImV4cCI6MTcyNzE5NDAyNywidHlwZSI6InNpZ251cFN1Y2Nlc3MifQ.agpIRls95th62C6vh8YT8rQgQr4sVyEKtIsxBwzpOvE')

module.exports = {
  loginUserWithEmailAndPassword,
  singupUser,
  verifySignupSuccess,
  getUserInfo
}