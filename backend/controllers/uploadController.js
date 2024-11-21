const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

const deleteImage = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../../uploads', filename);// deleteIMAGE.......

  fs.unlink(filePath, (err) => {
    if (err) {
      res.status(500).json({ message: 'Failed to delete image' });
    } else {
      res.json({ message: 'Image deleted successfully' });
    }
  });
};

// @desc    Upload image for a product
// @route   POST /api/upload/:id
// @access  Private/Admin
const uploadImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (req.file) {
    const imagePath = `${req.file.filename}`;
    product.image = imagePath;
    await product.save();
    res.status(200).json({ message: 'Image uploaded successfully' });
  } else {
    res.status(400);
    throw new Error('No image file uploaded');
  }
});

module.exports = {
  deleteImage,
  uploadImage,
};