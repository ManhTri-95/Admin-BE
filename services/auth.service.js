
const httpStatus = require('http-status');
const userService = require('./user.service');
const emailService = require('./email.service');
const ApiError = require('../utils/ApiError');
const { User } = require('../models')
// const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


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


const singupUser = async(email, firstName, lastName, phone) => {
  const user = await userService.getUserByEmail(email);
  if (user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User already exists');
  }

  const password = crypto.randomBytes(5).toString('hex');
  const hashedPw = await bcrypt.hash(password, 12);
  const newUser = new User({
    email: email,
    password: hashedPw,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    position: '',
  });

  await newUser.save()

  const emailPromise = await emailService.sendSignupSuccessUser(newUser, password);
  console.log(emailPromise)
}


module.exports = {
  loginUserWithEmailAndPassword,
  singupUser
}