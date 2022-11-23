const express = require('express');
const logger = require('./logger');
const app = express();

// req => middleware => res
// app.use() takes a path and a middleware function and applies it to all the routes related to that path
// this way we don't have to manually add the middleware to all of the routes we want the middleware to be added
// if path argument is not given to app.use() then it will apply the middleware to all paths

app.use(logger);

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/about', (req, res) => {
  res.send('About');
});

app.get('/api/products', (req, res) => {
  res.send('Products');
});
app.get('/api/items', (req, res) => {
  res.send('Items');
});
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
