const { body } = require('express-validator');
const { validatePassword, REGEXP_PWD } = require('./commonValidators');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const validateNewPassword = () => {
  return body('newPassword')
    .notEmpty().withMessage('New Password is required')
    .matches(REGEXP_PWD).withMessage('New password must be between 8 to 18 characters and include at least one lowercase letter, one uppercase letter, one number, and one special character.')
    .custom(async (newPassword, { req }) => {
      // Fetch the user using the ID from the request object
      const user = await User.findById(req.userId);
      if(!user) {
        throw new Error('User not found');
      }

      // Check if the new password is the same as the current password
      const isMatch = await bcrypt.compare(newPassword, user.password);
      if (isMatch) {
        throw new Error('New password must be different from the old password');
      } 

      return true;
    })
}

const validateConfirmPassword = () => {
  return body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Confirm password does not match new password');
      }
      return true
    })
}


const validateChangePassword = () => {
  return [
    validatePassword(),
    validateNewPassword(),
    validateConfirmPassword(),
  ]
}

module.exports = validateChangePassword;