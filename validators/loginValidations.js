//const { body } = require('express-validator');
const { validateEmail, validatePassword } = require('./commonValidators');

const validateLogin = () => {
  return [
    validateEmail(),
    validatePassword(),
  ]
}

module.exports = validateLogin;