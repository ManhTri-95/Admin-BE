const httpStatus = require('http-status');
const { Role } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');


/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 */
const queryRoles = async (filter, options) => {
  if (options.getAll) {
    return await Role.find(filter).select(options.select);
  } else {
    return  await Role.paginate(filter, options);
  }
};

/**
 * Get role by id
 * @param {ObjectId} id 
 * @returns {Promise<Role>}
 */
const getRoleById = async (id) => {
  return Role.findById(id);
};


/**
 * Create a role
 * @param {Object} roleBody 
 * @returns {Promise<Role>}
 */
const createRole = async (roleBody) => {
  const role = new Role({
    name: roleBody.roleName,
    value: roleBody.roleValue,
    remark: roleBody.roleRemark,
    roleMenu: roleBody.roleMenu
  });

  return role.save();
};


/**
 * Delete role by ids
 * @param {[ObjectId]} roleIds
 * @returns {Promise<{deletedCount: number}>}
 */
const deleteRoleById = async (roleIds) => {
  const idsToDelete = roleIds || [];

  if (!Array.isArray(idsToDelete) || idsToDelete.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No role IDs provided');
  }

  const objectIdArr = idsToDelete.map(id => new mongoose.Types.ObjectId(id));

  const result = await Role.deleteMany({ _id: { $in: objectIdArr } });

  if (result.deleteCount === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No roles found to delete');
  }

  return { deletedCount: result.deletedCount };
};


/**
 * Detail role 
 * @param {string} roleId
 * @returns {Promise<Role>} 
 */
const detailRole = async (roleId) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found!');
  }
  return role;
};


/**
 * Update role by id
 * @param {ObjectId} roleId
 * @param {Object} updateBody
 * @returns {Promise<Role>}
 */
const updateRoleById = async (roleId, updateBody) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }

  Object.assign(role, updateBody);
  await role.save();
  return role;
}

module.exports = {
  queryRoles,
  createRole,
  deleteRoleById,
  detailRole,
  updateRoleById,
}
