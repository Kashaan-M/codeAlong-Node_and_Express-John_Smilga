const express = require('express');

const auth = (req, res) => {
  const { name } = req.body;
  if (name) {
    //people = [...people, { id: people.length + 1, name: name }];
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send('Please Provide Credentials');
};

module.exports = auth;
