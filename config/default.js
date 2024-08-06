

module.exports = { 
  PORT: process.env.PORT || 3001,
  MONGO_USER: process.env.MONGO_USER || 'bootrancntt',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'afBnBP0J5Qw1GI9H',
  MONGO_DEFAULT_DB: process.env.MONGO_DEFAULT_DB || 'message',
  API_KEY_MAILJET:  process.env.API_KEY_MAILJET,
  API_SECRET_MAILJET:  process.env.API_SECRET_MAILJET,

  JWT_SECRET: process.env.JWT_SECRET,
}