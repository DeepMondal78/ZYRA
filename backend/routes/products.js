// backend/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 
const { protect } = require('../middleware/authMiddleware'); // অথেন্টিকেশন মিডেলওয়্যার ইম্পোর্ট করা হলো

// @route   POST /api/products
// @desc    Create a new product (Protected: Only authenticated users/admin)
router.post('/', protect, async (req, res) => {
    try {
        const { name, price, image, description, category, stock } = req.body;

        // Validation: Check if required fields are present
        if (!name || !price || !image) {
            return res.status(400).json({ message: "Please enter all required fields (name, price, image)" });
        }

        // Create new product object
        const newProduct = new Product({
            name,
            price,
            image,
            description,
            category,
            stock
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({ message: "Server error while saving product", error: error.message });
    }
});

// @route   GET /api/products
// @desc    Get all products from MongoDB (Public route)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().lean(); // .lean() ব্যবহার করলে পারফরম্যান্স ভালো হয় এবং অডিট dbrules খুশি থাকে
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching products", error: error.message });
    }
});

module.exports = router;