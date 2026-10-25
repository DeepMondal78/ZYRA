const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 
const { protect } = require('../middleware/authMiddleware');

// GET: Public (Get all products)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// POST: Protected (Create product)
router.post('/', protect, async (req, res) => {
    try {
        const { name, price, image, description, category, stock } = req.body;
        if (!name || !price || !image) {
            return res.status(400).json({ message: "Please enter all required fields" });
        }
        const newProduct = new Product({ name, price, image, description, category, stock });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// DELETE: Protected (Delete product)
router.delete('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        await product.deleteOne();
        res.status(200).json({ message: "Product removed" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;