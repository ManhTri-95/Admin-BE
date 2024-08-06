const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const { JWT_SECRET } = require('../config/default');
// const user = require('../models/user');
const tokenStore = {};


const generateToken = (user) => { 
  const payload = {  userId: user._id.toString(), tokenVersion: user.tokenVersion };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h'})
}

const generateVerificationToken = (email) => {
  const token = uuidv4();
  tokenStore[token] = { email, expiresAt: Date.now() + 3600000 }; // Token hết hạn sau 1 giờ
  return token;
};

module.exports = {
  generateToken,
  generateVerificationToken,
  tokenStore
}