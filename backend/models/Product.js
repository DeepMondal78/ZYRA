// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
}, { timestamps: true }); // এটি দিয়ে প্রোডাক্টটি কখন তৈরি হলো সেই সময় অটোমেটিক সেভ থাকবে

module.exports = mongoose.model('Product', productSchema);