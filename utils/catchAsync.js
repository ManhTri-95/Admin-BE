const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch((err) => next(err));
}

const createResponse = (status, message, data = null) => {
  return {
    status: status,
    message: message,
    data: data
  }
}

module.exports = {
  catchAsync,
  createResponse
}
  