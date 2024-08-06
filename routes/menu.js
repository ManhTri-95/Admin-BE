const express = require('express');
const isAuth = require('../middleware/is-auth');

const menuController = require('../controllers/menu');
const router = express.Router();

router.get('/get-menu', isAuth, menuController.getMenu);


module.exports = router;