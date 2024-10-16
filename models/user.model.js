const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');
const toJson = require('./plugins/toJson.plugin');
const Role = require('./role.model');


const userSchema = new mongoose.Schema(
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
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      private: true
    },
    position: {
      type: String,
      required: false
    },
    status: {
      type: Number,
      enum: [0, 1],
      required: true,
      default: 0
    },
    // status: {
    //   type: Boolean,
    //   required: true,
    //   default: false
    // },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    lastLoginAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    // toJSON: { 
    //   virtuals: true,
    //   versionKey: false,
    //   transform: (doc, ret) => {
    //     ret.id = ret._id; 
    //     delete ret._id;
    //     delete ret.lastLoginAt;
    //     delete ret.createdAt;
    //     delete ret.updatedAt;
    //     return ret;
    //   },
    // }
  },
);



// userSchema.methods.updateLastLogin = function () {
//   return this.updateOne({ lastLoginAt: new Date() });
// };
//userSchema.plugin(toJson);

userSchema.plugin(toJson);
userSchema.plugin(mongoosePaginate);


/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
*/
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password)
}


/**
 * Check if email is taken
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _is: { $ne: excludeUserId } });
  return !!user
};


userSchema.pre('validate', async function(next) {
  if (!this.role) {
    const defaultRole = await Role.findOne({ value: 'admin' }); // Giả sử role mặc định là 'user'
    if (defaultRole) {
      this.role = defaultRole._id; 
    }
  }
  
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;



