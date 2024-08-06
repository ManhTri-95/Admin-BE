require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const errorMiddleware = require('./middleware/errorMiddleware');
const { PORT, MONGO_USER, MONGO_PASSWORD, MONGO_DEFAULT_DB } = require('./config/default');

const app = express();

app.use(bodyParser.json());// application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3100'),
  res.setHeader('Access-Control-Allow-Credentials', 'true'),
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTION');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/auth', authRoutes);
app.use('/menu', menuRoutes)
app.use(errorMiddleware);

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.tei1gv0.mongodb.net/${MONGO_DEFAULT_DB}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(result => {
    app.listen(PORT)
  })
  .catch(err => console.log(err));