const { body } = require('express-validator');
const User = require('../models/user.bak');

const validateAddUser = () => {
  return [
    body('firstName')
      .notEmpty().withMessage('First name is required'),
    body('lastName')
      .notEmpty().withMessage('Last name is required'),
    body('email')
      .notEmpty().withMessage('Email required')
      .isEmail().withMessage('Email is invalid')
      .custom(async (email, { req }) => {
        const user = await User.findOne({ email: email });
        if (user) {
          throw new Error('This email already exists');
        }

        return true;
      })
  ]
}

module.exports = validateAddUser;