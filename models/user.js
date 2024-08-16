const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RoleSchema = new Schema({
  role: {
    type: String,
    enum: ['super', 'admin', 'user', 'guest'],
    required: true,
    default: 'Admin'
  }
});



const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true
  },

  status: {
    type: Number,
    enum: [0, 1],
    required: true,
    default: 0
  },

  tokenVersion: {
    type: Number, 
    default: 0
  },
  
  roles: {
    type: [RoleSchema],
    default: [{ role: 'admin'}]
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  lastLoginAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.updateLastLogin = function () {
  this.lastLoginAt = new Date();
  return this.save();
}

module.exports = mongoose.model('User', userSchema);