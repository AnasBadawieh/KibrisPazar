const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct } = require('../controllers/productController');

// Ensure all routes have valid callback functions
router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProductById);

module.exports = router;