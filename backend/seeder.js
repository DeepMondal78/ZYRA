// backend/seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";

// ⚠️ তোমার প্রোডাক্ট মডেলের সঠিক পাথটি এখানে দাও (যেমন: models/Product.js)
// যদি তোমার মডেলে export default Product করা থাকে, তবে এভাবে ইমপোর্ট করবে:
import Product from "./models/Product.js"; 

dotenv.config();

// মঙ্গোডিবি কানেকশন স্ট্রিং (তোমার লোকাল URL)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:21017/zyra_db"; 

const productsToSeed = [
  { name: "Double-Breasted Blazer", price: 129, image: "/zara7.webp", description: "Premium double-breasted blazer from ZYRA." },
  { name: "Oversized Cotton Shirt", price: 59, image: "/zara8.webp", description: "Premium oversized cotton shirt from ZYRA." },
  { name: "High-Waist Trousers", price: 89, image: "/zara9.webp", description: "Premium high-waist trousers from ZYRA." },
  { name: "Leather Crossbody Bag", price: 119, image: "/zara10.webp", description: "Premium leather crossbody bag from ZYRA." },
  { name: "Minimalist Wool Coat", price: 259, image: "/zara11.webp", description: "Premium minimalist wool coat from ZYRA." },
  { name: "Satin Effect Dress", price: 79, image: "/zara12.webp", description: "Premium satin effect dress from ZYRA." },
  { name: "Linen Blend Waistcoat", price: 69, image: "/zara13.webp", description: "Premium linen blend waistcoat from ZYRA." },
  { name: "Strappy Sandals", price: 89, image: "/zara14.webp", description: "Premium strappy sandals from ZYRA." },
  { name: "Summer Linen Shirt", price: 69, image: "/zara15.webp", description: "Premium summer linen shirt from ZYRA." },
  { name: "Classic Chinos", price: 69, image: "/zara16.webp", description: "Premium classic chinos from ZYRA." },
  { name: "Silk Blend Top", price: 69, image: "/zara17.webp", description: "Premium silk blend top from ZYRA." },
  { name: "Knitted Polo", price: 69, image: "/zara18.webp", description: "Premium knitted polo from ZYRA." },
  { name: "Denim Jacket", price: 69, image: "/zara19.webp", description: "Premium denim jacket from ZYRA." },
  { name: "Basic T-Shirt", price: 69, image: "/zara20.webp", description: "Premium basic t-shirt from ZYRA." },
  { name: "Summer Shorts", price: 69, image: "/zara21.webp", description: "Premium summer shorts from ZYRA." },
  { name: "Evening Dress", price: 69, image: "/zara22.webp", description: "Premium evening dress from ZYRA." },
  { name: "Cotton Scarf", price: 69, image: "/zara23.webp", description: "Premium cotton scarf from ZYRA." },
  { name: "Leather Belt", price: 69, image: "/zara24.webp", description: "Premium leather belt from ZYRA." }
];

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // Priviusly seeded data delete kore new data insert kora
    await Product.deleteMany();
    console.log("Old products cleared...");

    // New 18 products insert kora
    await Product.insertMany(productsToSeed);
    console.log("🚀 All 18 Premium Products Imported Successfully into ZYRA DB!");

    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();