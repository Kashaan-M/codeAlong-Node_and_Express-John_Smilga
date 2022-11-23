const express = require('express');
const { people } = require('../data');

// GET request
const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

// POST request
const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, msg: 'please provide name value' });
  }
  res.status(201).json({ success: true, person: name });
};

// different POST request
const createPersonPostman = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, msg: 'pleae provide name value' });
  }
  res.status(201).json({ success: true, data: [...people, name] });
};

// PUT request
const updatePeople = (req, res) => {
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
};

// DELETE request
const deletePerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res.status(404).json({ success: false, msg: `No person with id ${id}` });
  }
  const filterPeople = people.filter((person) => person.id !== Number(id));
  res.status(200).json({ success: true, data: filterPeople });
};

module.exports = { getPeople, createPerson, createPersonPostman, updatePeople, deletePerson };
