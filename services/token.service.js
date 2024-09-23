const moment = require('moment');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const { tokenTypes } = require('../config/tokens');


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
    // access: {
    //   token: accessToken,
    //   expries: accessTokenExpries.toDate()
    // }
  }
}

/** Generate signup success token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateSignupSuccessToken = async (email) => {
  const expires = moment().add(config.jwt.signupSuccessExpirationMinutes, 'minutes');
  const signupSuccessToken = generateToken(email, expires, tokenTypes.SIGNUP_SUCCESS);
  return signupSuccessToken
}
 

module.exports = {
  generateAuthTokens,
  generateSignupSuccessToken
}