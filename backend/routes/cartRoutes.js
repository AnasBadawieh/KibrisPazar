// backend/routes/cartRoutes.js

const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

//router.route('/').get(protect, getCart);
//router.route('/add').post(protect, addToCart);
router.route('/').post(protect, addToCart).get(protect, getCart);
router.route('/remove/:id').delete(protect, removeFromCart);

module.exports = router;