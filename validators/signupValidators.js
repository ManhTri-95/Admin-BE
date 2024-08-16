const { validateEmail } = require('./commonValidators');

const validateSignup = () => {
  return [
    validateEmail()
  ]
}

module.exports = validateSignup;