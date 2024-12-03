const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const { deleteImage, createProduct } = require('../controllers/uploadController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

const storage = multer.memoryStorage(); // Use memory storage to process the file in memory

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|gif|bmp|tiff|tif|webp|avif|heic|heif|/; // Add more file types as needed
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const uploadPromises = req.files.map(async (file) => {
      const filename = `${file.fieldname}-${Date.now()}.jpg`;
      const outputPath = path.join(__dirname, '../../uploads', filename);

      await sharp(file.buffer)
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      return `/uploads/${filename}`;
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    res.send(uploadedFiles);
  } catch (error) {
    res.status(500).send({ message: 'Failed to upload images', error });
  }
});

router.delete('/:filename', deleteImage);

module.exports = router;