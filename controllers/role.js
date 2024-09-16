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