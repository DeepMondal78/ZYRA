const express = require('express');
const router = express.Router();
// 🌟 এখানে loginUser কন্ট্রোলারটিও ইম্পোর্ট করতে হবে
const { registerUser, loginUser } = require('../controllers/authController');

// Route define kora hocche
router.post('/register', registerUser);

// 🌟 এই নতুন লাইনটি যোগ করুন লগইনের জন্য
router.post('/login', loginUser); 

module.exports = router;