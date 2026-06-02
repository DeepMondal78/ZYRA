// backend/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

// ১. @route   POST /api/products
//    @desc    Create a new product (ডাটাবেজে প্রোডাক্ট সেভ করা)
router.post('/', async (req, res) => {
    try {
        const { name, price, image, description } = req.body;

        // ভ্যালিডেশন চেক
        if (!name || !price || !image) {
            return res.status(400).json({ message: "Please enter all required fields (name, price, image)" });
        }

        // নতুন প্রোডাক্টের অবজেক্ট তৈরি
        const newProduct = new Product({
            name,
            price,
            image,
            description
        });

        // ডাটাবেজে সেভ করা
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({ message: "Server error while saving product", error: error.message });
    }
});

// ২. @route   GET /api/products
//    @desc    Get all products from MongoDB (ডাটাবেজ থেকে সব প্রোডাক্ট দেখা)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching products", error: error.message });
    }
});

// 👈 এই যে নিচের লাইনটি, এটি না দিলে সার্ভার ক্র্যাশ করবে!
module.exports = router;