const express = require('express');
const userController = require('../../controllers/user.controller');
const auth = require('../../middleware/auth');


const router = express.Router();

router.get('/list', auth(), userController.getListUser);

router.get('/user-detail', auth(), userController.getUserDetail);

router.post('/add', auth(), userController.postAddUser);

router.put('/edit', auth(), userController.putEditUser);

router.post('/update-status', auth(), userController.postUserStatus);

router.post('/delete', auth(), userController.postDeleteUser);

module.exports = router;