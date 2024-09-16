const express = require('express');

const isAuth = require('../middleware/is-auth');

const roleController = require('../controllers/role');
const router = express.Router();

router.post('/add', isAuth, roleController.postAddRole);

router.get('/list', isAuth, roleController.getRoleList);

module.exports = router;
