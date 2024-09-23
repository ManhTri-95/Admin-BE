const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
      required: false,
      trim: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      required: false
    },
    status: {
      type: Boolean,
      required: true,
      default: false
    },
    // role: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Role',
    //   required: true,
    // },
    lastLoginAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.updateLastLogin = function () {
  return this.updateOne({ lastLoginAt: new Date() });
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password)
}

module.exports = mongoose.model('User', userSchema);



