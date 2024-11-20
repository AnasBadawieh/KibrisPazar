const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, countInStock, seller } = req.body;

  if (!seller) {
    res.status(400);
    throw new Error('Seller is required');
  }

  const product = new Product({
    name,
    price,
    description,
    image,
    countInStock,
    seller,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};