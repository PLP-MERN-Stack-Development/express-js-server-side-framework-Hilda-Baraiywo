const mongoose = require('mongoose');

// Define schema - rules to follow to create collections
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true},
    price: { type: Number, min: 0, required: true},
    category: { type: String, required: true},
    inStock: { type: Boolean, required: true, default: true}
}, { timestamps: true });

// Create the model to represents collections
const Product = mongoose.model("Product", productSchema)

module.exports = Product;