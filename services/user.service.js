const { User } = require('../models');

/**
 * 
 * @param {ObjectId} id 
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return await User.findById(id)
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
}


module.exports = {
  getUserById,
  getUserByEmail
}
