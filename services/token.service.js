const moment = require('moment');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const { tokenTypes } = require('../config/tokens');
const { Token } = require('../models');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * Save a token
 */
const saveToken = async (token, userId, expries, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expries: expries.toDate(),
    type,
    blacklisted
  });

  return tokenDoc;
}

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token 
 * @param {string} type 
 * @returns {Promise<Token>}
 */
const verifyToken = async(token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
}

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expries, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expries.unix(),
    type
  }

  return jwt.sign(payload, secret);
}

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) =>  {
  const accessTokenExpries = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpries, tokenTypes.ACCESS);
  return {
    token: accessToken,
  }
}

/** Generate signup success token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateSignupSuccessToken = async (user) => {
  const expires = moment().add(config.jwt.signupSuccessExpirationMinutes, 'minutes');
  const signupSuccessToken = generateToken(user._id, expires, tokenTypes.SIGNUP_SUCCESS);
  await saveToken(signupSuccessToken, user._id, expires, tokenTypes.SIGNUP_SUCCESS);
  return signupSuccessToken;
}
 
/**
 * Generate reset passord token
 */
const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');

  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);

  await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);

  return {
    tokenResetPassword: resetPasswordToken,
    userInfo: user
  } 
}

module.exports = {
  generateAuthTokens,
  generateSignupSuccessToken,
  verifyToken,
  generateResetPasswordToken
}