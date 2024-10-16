const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const toJson = require('./plugins/toJson.plugin');

const roleSchema = mongoose.Schema({
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
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    default: []
  }]
});


roleSchema.plugin(toJson);
roleSchema.plugin(mongoosePaginate);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;