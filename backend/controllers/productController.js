const Product = require('../models/productModel');

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Get single product by ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

// Create new product
const createProduct = async (req, res) => {
  const { name, description, price, countInStock } = req.body;

  const product = new Product({
    name,
    description,
    price,
    countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

module.exports = { getProducts, getProductById, createProduct };