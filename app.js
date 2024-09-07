require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const userRoutes = require('./routes/user');
const uploadRoutes = require('./routes/uploads/uploadRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const { PORT, MONGO_USER, MONGO_PASSWORD, MONGO_DEFAULT_DB } = require('./config/default');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());// application/json

const allowedOrigins = ['https://localhost:3100', 'https://matches-taupe.vercel.app'];
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Check if the request origin is in the list of allowed origins
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin); // Set the allowed origin dynamically
  }
  //res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3100,https://matches-taupe.vercel.app'),
  res.setHeader('Access-Control-Allow-Credentials', 'true'),
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTION');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);
app.use('/user', userRoutes);
app.use('/uploads', uploadRoutes);
app.use(errorMiddleware);

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.tei1gv0.mongodb.net/${MONGO_DEFAULT_DB}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => console.log(err));
