require('dotenv').config();
require('express-async-errors');
const path = require('path');
const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const morgan = require('morgan');
const mainRouter = require('./routes/main');

// middleware
app.use(morgan('tiny'));
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());

app.use('/api/v1', mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
