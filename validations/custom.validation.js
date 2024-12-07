const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters')
  }

  if(!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }

  return value;
}

const confirmPassword = (value, helpers) => {
  const { newPassword } = helpers.state.ancestors[0]; 

  if (!newPassword) {
    return helpers.message('Please enter the new password first');
  }

  if (value !== newPassword) {
    return helpers.message('Confirm password must match the new password');
  }

  return value;
}


module.exports = {
  password,
  confirmPassword
}