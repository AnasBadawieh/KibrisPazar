const mongoose = require('mongoose');

// const cartItemSchema = mongoose.Schema(
//   {
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true,
//     },
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//     price: { type: Number, required: true },
//     countInStock: { type: Number, required: true },
//     qty: { type: Number, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'],
    default: 'buyer',
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;