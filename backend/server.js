const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // db.js import kora hocche
// ... অন্য ইম্পোর্টগুলো
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const paymentRoutes = require('./routes/payment');


const app = express();

// Connection & Middleware
connectDB();
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('ZYRA Backend API Running...'));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes); // Payment route add kora hocche

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));