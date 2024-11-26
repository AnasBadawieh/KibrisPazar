// backend/routes/cartRoutes.js

const express = require('express');
const { updateCartItem,addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

//router.route('/').get(protect, getCart);
//router.route('/add').post(protect, addToCart);
router.route('/').post(protect, addToCart).get(protect, getCart);
router.route('/update/:id').put(protect, updateCartItem);
router.route('/remove/:id').delete(protect, removeFromCart);

module.exports = router;