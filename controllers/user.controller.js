const { createResponse, catchAsync } = require('../utils/catchAsync');
const { userService } = require('../services');

const getListUser = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    page: req.query.pageIndex || 1,
    limit: req.query.pageSize || 10,
  };
 

  //const user = await User.paginate({}, options);
  const result = await userService.queryUsers(filter, options)

  const data = {
    lists: result.docs,
    totals: result.totalDocs,
  };
  const response = createResponse(200, 'Get lists success!', data)
  res.status(200).json(response)
});

const getUserDetail = catchAsync(async (req, res) => {
  const user = await userService.detailUser(req.query.id);
  const response = createResponse(200, 'Get user success!', user);
  res.status(200).json(response);
});

const postAddUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const response = createResponse(200, 'Create user success!', user);
  res.status(200).json(response);
});

const putEditUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.body.id, req.body);
  const response = createResponse(200, 'Edit user success!', user);
  res.status(200).json(response);
});

const postUserStatus = catchAsync(async (req, res) => {
  await userService.updateStatusUserById(req.body)
  const response = createResponse(200, 'Update status user success');
  res.status(200).json(response);
});

const postDeleteUser = catchAsync(async (req, res) => {
  const user = await userService.deleteUserById(req.body);
  const response = createResponse(200, 'Delete user success!', user);
  res.status(200).json(response);
})

module.exports = {
  getListUser,
  getUserDetail,
  postAddUser,
  putEditUser,
  postUserStatus,
  postDeleteUser
}