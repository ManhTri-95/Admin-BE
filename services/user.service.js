const { User } = require('../models');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
}

/**
 * 
 * @param {ObjectId} id 
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return await User.findById(id)
};


/**
 * Get user by email
 * @param {string} email 
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return await User.findOne({ email });
}

/**
 * Detail user 
 * @param {ObjectId} userId 
 */
const detailUser = async (userId) => {
  const user = await getUserById(userId);

  if(!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  return user;
}


/**
 * Create a User
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const hashedPw = await bcrypt.hash(userBody.newPassword, 12);

  const user = new User({
    avatar: userBody.avatar,
    email: userBody.email,
    firstName: userBody.firstName,
    lastName: userBody.lastName,
    status: userBody.status,
    phone: userBody.phone,
    position: '',
    password: hashedPw,
    //role: userBody.role,
  });
  await user.save();
};


const updateUserById = async(userId, userBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  
  Object.assign(user, userBody);
  await user.save();
  return user;
} 

const updateStatusUserById = async (userBody) => {
  const { id, status } = userBody;
  const user = await getUserById(id);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  user.status = status
  await user.save();
  return user;
}

const deleteUserById = async (userIds) => {
  const idsToDelete = userIds || [];

  if (!Array.isArray(idsToDelete) || idsToDelete.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No role IDs provided');
  }

  const objectIdArray = idsToDelete.map(id => new mongoose.Types.ObjectId(id));

  const result = await User.deleteMany({ _id: { $in: objectIdArray } });

  
  if (result.deleteCount === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No User found to delete');
  }

  return { deletedCount: result.deletedCount };
}


module.exports = {
  getUserById,
  getUserByEmail,
  queryUsers,
  detailUser,
  createUser,
  updateUserById,
  updateStatusUserById,
  deleteUserById
}
