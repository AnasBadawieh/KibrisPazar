const fs = require('fs');
const path = require('path');

const deleteImage = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      res.status(500).json({ message: 'Failed to delete image' });
    } else {
      res.json({ message: 'Image deleted successfully' });
    }
  });
};

module.exports = { deleteImage };