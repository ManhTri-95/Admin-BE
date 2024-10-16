const express = require('express');
const auth = require('../../middleware/auth');
const roleController = require('../../controllers/role.controller');

const router = express.Router();

router.get('/list', auth(), roleController.getListRole);

router.post('/add', auth(), roleController.postAddRole);

router.post('/delete', auth(), roleController.postDeleteRole);

router.get('/detail', auth(), roleController.getDetailRole);

router.put('/edit', auth(), roleController.putEditRole)

module.exports = router;