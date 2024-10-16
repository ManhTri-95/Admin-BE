const express = require('express');
const authRoute = require('./auth.route');
const menuRoute = require('./menu.route');
const userRoute = require('./user.route');
const roleRoute = require('./role.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/menu',
    route: menuRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/role',
    route: roleRoute,
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;