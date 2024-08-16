const express = require('express');
const isAuth = require('../middleware/is-auth');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/list', isAuth, userController.getUserList);

router.post('/update-status', isAuth, userController.postUserStatus);

router.post('/delete', isAuth, userController.postDeleteUser);

module.exports = router;