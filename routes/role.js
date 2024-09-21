const express = require('express');

const isAuth = require('../middleware/is-auth');

const roleController = require('../controllers/role');
const router = express.Router();

router.post('/add', isAuth, roleController.postAddRole);

router.get('/list', isAuth, roleController.getRoleList);

router.put('/edit', isAuth, roleController.putEditRole);

router.get('/detail', isAuth, roleController.getDetailRole);

module.exports = router;
