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
  const { name } = req.body;
  if (name) {
    //people = [...people, { id: people.length + 1, name: name }];
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send('Please Provide Credentials');
});

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res.status(404).json({ success: false, msg: `No person with id ${id}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });

  res.status(201).json({ success: true, data: newPeople });
});

app.delete('/api/people/:id', (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res.status(404).json({ success: false, msg: `No person with id ${id}` });
  }
  const filterPeople = people.filter((person) => person.id !== Number(id));
  res.status(200).json({ success: true, data: filterPeople });
});
app.listen(3000, () => console.log('server is listening on port 3000'));
