const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: { 
    type: String,
    require: true,
    default: 'User'
  },
  value: {
    type: String,
    require: true,
    default: 'user'
  },
  remark: {
    type: String,
    default: ''
  },
  roleMenu: [{
    type: Schema.Types.ObjectId,
    ref: 'Menu',
    default: []
  }]
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;