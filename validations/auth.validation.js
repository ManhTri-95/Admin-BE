const { body } = require('express-validator');
const Joi = require('joi');
const { password, confirmPassword } = require('./custom.validation');

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    policy: Joi.boolean(),
  })
}


const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  })
}

const setNewPassword = {
  body: Joi.object().keys({
    newPassword: Joi.string().required().custom(password),
    confirmPassword: Joi.string().required().custom(confirmPassword),
    token: Joi.string().required()
  })
}

const verifyTokenResetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required()
  })
}

module.exports = {
  login,
  register,
  forgotPassword,
  setNewPassword,
  verifyTokenResetPassword
}