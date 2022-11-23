const express = require('express');
const morgan = require('morgan');
let { people } = require('./data');
const app = express();

app.use(morgan('tiny'));

// static assets
app.use(express.static('../../node-express-course/02-express-tutorial/methods-public/'));

// parses the form data(for POST requests) and adds the values to req.body. NOTE: req.body will be undefined unless we write the below line of code
app.use(express.urlencoded({ extended: false }));
// parse json (for incoming requests)
app.use(express.json());

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post('/api/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, msg: 'please provide name value' });
  }
  res.status(201).json({ success: true, person: name });
});

// using postman app

app.post('/api/postman/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, msg: 'pleae provide name value' });
  }
  res.status(201).json({ success: true, data: [...people, name] });
});

app.post('/login', (req, res) => {
  console.log(req.headers);
  const { name } = req.body;
  console.log('name = ', name);
  if (name) {
    //people = [...people, { id: people.length + 1, name: name }];
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send('Please Provide Credentials');
});
app.listen(3000, () => console.log('server is listening on port 3000'));
