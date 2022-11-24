const express = require('express');
const app = express();
const morgan = require('morgan');
const { resolve } = require('path');
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');

// logger
app.use(morgan('tiny'));
// middleware
app.use(express.static(resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes

app.use('/api/v1/tasks', tasks);
// 404 route and middleware on below line for all the routes that don't exist
app.use(notFound);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
