const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required()
  })
  .unknown();
  const {value: envVars } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url : envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
  }
}