const mongoose = require('mongoose');

// local mongodb connection URI

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
