const express = require('express');
const isAuth = require('../middleware/is-auth');

const menuController = require('../controllers/menu');
const menusController = require('../controllers/menus');
const router = express.Router();

router.get('/get-menu', isAuth, menuController.getMenu);

router.get('/get-menus', menusController.getMenu)

router.post('/add', menusController.postAddMenu);

module.exports = router;