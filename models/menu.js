const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const metaSchema = new Schema({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  isLink: {
    type: String,
    default: ''
  },
  isHide: {
    type: Boolean,
    default: false
  },

  isFull: {
    type: Boolean,
    default: false
  },
  isAffix: {
    type: Boolean,
    default: false
  },
  isKeepAlive: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const menuSchema = new Schema({
  type: {
    type: Number,
    default: 0
  },
  path: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  component: 
  { type: String, 
    default: '' 
  },
  meta: {
    type: metaSchema,
    default: () => ({})
  },
  parentId: { 
    type: Schema.Types.ObjectId, ref: 'Menu', 
    default: null
   }, // Add parentId to identify parent menu
  children: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Menu', 
    default: [] 
  }],
  redirect: { 
    type: String, 
    default: '' 
  },
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;