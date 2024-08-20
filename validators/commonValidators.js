const { body } = require('express-validator');

const REGEXP_PWD = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

const validateEmail = () => {
  return body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email is invalid')
}

const validatePassword = () => {
  return body('password')
    .notEmpty().withMessage('Password is required')
    .matches(REGEXP_PWD).withMessage('Password must be between 8 to 18 characters and include at least one lowercase letter, one uppercase letter, one number, and one special character.')
}


module.exports = { validateEmail, validatePassword, REGEXP_PWD }