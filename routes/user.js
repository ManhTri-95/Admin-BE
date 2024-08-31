const express = require('express');
const isAuth = require('../middleware/is-auth');
const userController = require('../controllers/user');
const handleValidationErrors = require('../middleware/validationErrorMiddleware');
const validateUser = require('../validators/userValidator');

const router = express.Router();

router.get('/list', isAuth, userController.getUserList);

router.post('/update-status', isAuth, userController.postUserStatus);

router.post('/delete', isAuth, userController.postDeleteUser);

router.post('/add', isAuth, [ validateUser(), handleValidationErrors ], userController.postAddUser);

router.get('/user-detail', isAuth, userController.getUserDetail);

router.put('/edit', isAuth, userController.putEditUser);

module.exports = router;