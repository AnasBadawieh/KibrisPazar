const express = require('express');
const { createProduct } = require('../controllers/sellerController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/products').post(protect, createProduct);

module.exports = router;