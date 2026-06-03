// backend/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

// @route   POST /api/products
// @desc    Create a new product (Save new product to MongoDB)
router.post('/', async (req, res) => {
    try {
        const { name, price, image, description } = req.body;

        // Validation: Check if required fields are present
        if (!name || !price || !image) {
            return res.status(400).json({ message: "Please enter all required fields (name, price, image)" });
        }

        // Create new product object
        const newProduct = new Product({
            name,
            price,
            image,
            description
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({ message: "Server error while saving product", error: error.message });
    }
});

// @route   GET /api/products
// @desc    Get all products from MongoDB (Fetch all products from the database)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching products", error: error.message });
    }
});

// This line is not add to crush server (Requird for export the router to use in server.js)
module.exports = router;