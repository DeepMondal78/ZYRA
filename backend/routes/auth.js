const express = require('express');
const router = express.Router();
// Importing login controller functions
const { registerUser, loginUser } = require('../controllers/authController');

// Route define kora hocche
router.post('/register', registerUser);

// New login route added
router.post('/login', loginUser); 

module.exports = router;