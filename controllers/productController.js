const Product = require("../models/Product");

// List all the products
const getAllProducts = async (req, res) => {
  try {
    // Extract query parameters
    let { category, search, page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Build a filter object
    const filter = {};

    // Filtering by category (exact match)
    if (category) {
      filter.category = { $regex: new RegExp(category, "i") }; // case-insensitive match
    }

    // Search by name (partial match)
    if (search) {
      filter.name = { $regex: new RegExp(search, "i") };
    }

    // Calculate pagination skip value
    const skip = (page - 1) * limit;

    // Fetch filtered and paginated products
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // latest first

    // Count total matching products
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      count: products.length,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.status(200).json({
      data: product
    });
  } catch (error) {
    res.status(404).json({
      message: "Product not found"
    });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, inStock } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      inStock
    });

    res.status(201).json({
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: product
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
