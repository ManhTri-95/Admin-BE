const express = require('express');
const isAuth = require('../middleware/is-auth');

//const menuController = require('../controllers/menu');
const menuController = require('../controllers/menus');
const router = express.Router();

//router.get('/get-menu', isAuth, menuController.getMenu);

router.get('/get-menus', isAuth, menuController.getMenu);

router.post('/add', isAuth, menuController.postAddMenu);

router.post('/delete', isAuth, menuController.postDeleteMenu);

router.get('/menu-item', isAuth, menuController.getMenuItemDetail);

router.put('/edit', isAuth, menuController.putEditMenu);

module.exports = router;