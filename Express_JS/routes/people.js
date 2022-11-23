const express = require('express');
const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePeople,
  deletePerson,
} = require('../controllers/people');

const router = express.Router();
/*
router.get('/', getPeople);
router.post('/', createPerson);
router.post('/postman', createPersonPostman);
router.put('/:id', updatePeople);
router.delete('/:id', deletePerson);
*/

/* ALTERNATIVE for lines 12 to 16  */
router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePeople).delete(deletePerson);

module.exports = router;
