const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RoleSchema = new Schema({
  roleName: {
    type: String,
    enum: ['Super Admin', 'Admin', 'User', 'Guest'],
    required: true,
    default: 'Admin'
  },
  value: {
    type: String,
    enum: ['super', 'admin', 'user', 'guest'],
    required: true,
    default: 'admin'
  }
});

const userSchema = ({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  status: {
    type: String,
    required: true,
    default: 'I am status'
  },

  tokenVersion: {
    type: Number, 
    default: 0
  },
  
  roles: {
    type: [RoleSchema],
    default: [{
      roleName: 'Admin',
      value: 'admin'
    }]
  }
});

module.exports = mongoose.model('User', userSchema);