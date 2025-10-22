// server.js - Starter Express server for Week 2 assignment

require('dotenv').config();
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const logger = require('./middleware/logger');
const authMiddleware = require('./middleware/authMiddleware');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const validApiKey = process.env.API_KEY;

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(express.json());

// Custom middleware for logging
app.use(logger);

// Use product routes
app.use('/api/products', authMiddleware,productRoutes);

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route

app.get('/api/products', (req, res) => {
  res.json(products);
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(require('./middleware/errorMiddleware'));

// Export the app for testing purposes
module.exports = app;
