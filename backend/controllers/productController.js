const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Get single product by ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, countInStock, images } = req.body;
  
  // Validate images array
  if (!images || images.length === 0) {
    res.status(400);
    throw new Error('At least one product image is required');
  }

  const product = await Product.create({
    name,
    price,
    description,
    countInStock,
    images, // Save array of image URLs
    seller: req.user._id // Assuming you have auth middleware
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error('Invalid product data');
  }
});

module.exports = { getProducts, getProductById, createProduct };