const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const metaSchema = new Schema({
  icon: String,
  title: String,
  isLink: String,
  isHide: Boolean,
  isFull: Boolean,
  isAffix: Boolean,
  isKeepAlive: Boolean,
}, { _id: false });

const menuSchema = new Schema({
  type: Number,
  path: String,
  name: String,
  component: String,
  meta: metaSchema,
  parentId: { type: Schema.Types.ObjectId, ref: 'Menu', default: null }, // Thêm parentId để xác định menu cha
  children: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
  redirect: String, 
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;