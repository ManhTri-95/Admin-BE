const express = require('express');
const menuController = require('../../controllers/menu.controller');

const router = express.Router();

router.get('/get-menus', menuController.getMenu);

module.exports = router;