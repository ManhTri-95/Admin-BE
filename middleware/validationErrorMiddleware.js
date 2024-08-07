const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).json({
      status: '422',
      message: errors.array()[0].msg,
      //errors: errors.array()
    });
  }
  next();
}

module.exports = handleValidationErrors;