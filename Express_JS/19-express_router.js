const express = require('express');
const morgan = require('morgan');
const auth = require('./routes/auth');
const people = require('./routes/people');
const app = express();

app.use(morgan('tiny'));

// static assets
app.use(express.static('../../node-express-course/02-express-tutorial/methods-public/'));

// parses the form data(for POST requests) and adds the values to req.body. NOTE: req.body will be undefined unless we write the below line of code
app.use(express.urlencoded({ extended: false }));
// parse json (for incoming requests)
app.use(express.json());

app.use('/login', auth);
app.use('/api/people', people);

app.listen(3000, () => console.log('server is listening on port 3000'));
