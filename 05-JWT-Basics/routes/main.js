const express = require('express');
const { login, dashboard } = require('../controllers/main');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', authMiddleware, dashboard);
router.post('/login', login);

module.exports = router;
