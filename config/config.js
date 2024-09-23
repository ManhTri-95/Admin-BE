const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3001),
    MONGODB_URL: Joi.string().description('Mongo DB url'),
    JWT_SECRET: Joi.string().description('WT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30),
    JWT_SIGNUP_SUCCESS_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which signup success token expires'),
    API_KEY_MAILJET: Joi.number().description('API key mailjet'),
    API_SECRET_MAILJET: Joi.number().description('API secret mailjet'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  })
  .unknown();
  const {value: envVars } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url : envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
  },
  jwt: {
    secret: envVars.MONGODB_URL,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    signupSuccessExpirationMinutes: envVars.JWT_SIGNUP_SUCCESS_EXPIRATION_MINUTES,
  },
  email: { 
    mailjet: {
      keyMailjet: envVars.API_KEY_MAILJET,
      secretMailjet: envVars.API_SECRET_MAILJET
    },
    from: envVars.EMAIL_FROM
  }
}