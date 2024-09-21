const Role = require('../models/roles');

const { createResponse } = require('../utils/responseHelper');

exports.postAddRole = async (req, res, next) => {
  const { roleName, roleValue, roleRemark, roleMenu } = req.body;
  try {
    const role = new Role({
      name: roleName,
      value: roleValue,
      remark: roleRemark,
      roleMenu: roleMenu
    })

    await role.save();
    res.status(200).json(createResponse(
      200,
      'Add role user success!',
    ))
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.getRoleList = async (req, res, next) => {
  try {
    const roles = await Role.find()
      .select('name value remark');

    res.status(200).json(createResponse(
      200,
      'Get list role success!',
      roles 
    ))
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
} 


exports.getDetailRole = async (req, res, next) => {
  const roleId = req.query.id;
  try {
    const role = await Role.findById(roleId);
    if (!role) {
      const error = new Error('Cannot find role');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(createResponse(
      200,
      'Get role detail!',
      role
    ))
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.putEditRole = async (req, res, next) => {
  console.log(req.body);
  const { id, roleName, roleValue, roleRemark, roleMenu } = req.body;
  try {
    const role = await Role.findById(id);

    if (!role) {
      const error = new Error('Cannot find role');
      error.statusCode = 404;
      throw error;
    }

    role.name = roleName;
    role.value = roleValue;
    role.remark = roleRemark;
    role.roleMenu = roleMenu;

    await role.save();

    res.status(200).json(createResponse(
      200,
      'Edit role success!',
    ))
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}