const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // db.js ইমপোর্ট করা হলো
// ... অন্য ইম্পোর্টগুলো
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const paymentRoutes = require('./routes/payment'); // 👈 এটি যোগ করো


const app = express();

// ... কানেকশন ও মিডলওয়্যার
connectDB();
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('ZYRA Backend API Running...'));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes); // 👈 এটি যোগ করো (এন্ডপয়েন্ট: /api/payment/create-payment-intent)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));