const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// Route define kora hocche
router.post('/register', registerUser);

module.exports = router;