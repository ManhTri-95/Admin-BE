const { createResponse, catchAsync } = require('../utils/catchAsync');
const { roleService } = require('../services');


const getListRole = catchAsync(async (req, res) => {
  const filter = {};

  const getAll = req.query.pageSize == -1;

  const options = {
    select: 'name value remark _id',
    page: getAll ? undefined : parseInt(req.query.pageIndex) || 1,
    limit: getAll ? undefined : parseInt(req.query.pageSize) || 10,
    getAll
  };

  const result = await roleService.queryRoles(filter, options);

  const data = {
    lists: getAll ? result : result.docs,
    totals: getAll ? result.length : result.totalDocs,
  };

  const response = createResponse(200, 'Get list role success!', data)
  res.status(200).json(response)
});


const postAddRole = catchAsync(async (req, res) => {
  const role = await roleService.createRole(req.body);
  const response = createResponse(200, 'Add role success!', role)
  res.status(200).json(response);
});


const postDeleteRole = catchAsync(async (req, res) => {
  const role = await roleService.deleteRoleById(req.body);
  const response = createResponse(200, 'Delete role success!', role);
  res.status(200).json(response);
});

const getDetailRole = catchAsync(async (req, res) => {
  const role = await roleService.detailRole(req.query.id);
  const response = createResponse(200, 'Get role success!', role);
  res.status(200).json(response);
});

const putEditRole = catchAsync(async (req, res) => {
  await roleService.updateRoleById(req.body.id, req.body);
  const response = createResponse(200, 'Edit role success!')
  res.status(200).json(response);
});


module.exports = {
  getListRole,
  postAddRole,
  postDeleteRole,
  getDetailRole,
  putEditRole
}