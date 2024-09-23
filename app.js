const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const { errorHandler } = require('./middleware/error');
const httpStatus = require('http-status');
const routes = require('./routes/v1')
const { jwtStrategy } = require('./config/passport');
const ApiError = require('./utils/ApiError');

const app = express();

const corsOptions = {
  origin: 'https://localhost:3100', // Only allow localhost:3100 access
  credentials: true,
};

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1', routes);
// Send back a 404 error for any unknown API request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// handle error
app.use(errorHandler);

module.exports = app;