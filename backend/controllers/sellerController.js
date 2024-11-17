const Product = require('../models/productModel');

// Create new product
const createProduct = async (req, res) => {
  const { name, description, price, countInStock, image } = req.body;

  const product = new Product({
    name,
    description,
    price,
    countInStock,
    image,
    seller: req.user._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

module.exports = { createProduct };