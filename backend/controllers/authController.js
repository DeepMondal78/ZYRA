const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register User
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check jodi user age register thake
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password (নিরাপত্তার জন্য পাসওয়ার্ড লক করা)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login User
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ১. চেক করা—এই ইমেইলের কোনো ইউজার ডাটাবেজে আছে কি না
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credential synchronization.' });
    }

    // ২. পাসওয়ার্ড চেক করা (ডাটাবেজের হ্যাশ করা পাসওয়ার্ডের সাথে ম্যাচ করানো)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credential synchronization.' });
    }

    // ৩. লগইন সফল হলে JWT Token তৈরি করা
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // ৪. ফ্রন্টএন্ডে টোকেন ও ইউজারের ডাটা পাঠানো
    res.status(200).json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });

  } catch (error) {
    // কোনো ইন্টারনাল এরর হলেও যাতে HTML না গিয়ে JSON যায়, তা নিশ্চিত করা
    res.status(500).json({ message: error.message });
  }
};