const express = require('express');
const router = express.Router();
const multer = require('multer');
var dateFormat = require('dateformat');
const checkAuth = require('../../middleware/check-auth');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads/')
  },
  filename: function(req, file, callback) {
    callback(null, dateFormat(new Date(), "yyyymmdd_hhMMss") + '_' + file.originalname);
  }
});
const fileFilter = (req, file, callback) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ||file.mimetype === 'image/png') {
    callback(null, true);
  }
  else {
    // reject a file
    callback(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter 
});

const ProductsController = require('../controllers/products');

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getById);
router.post('/', checkAuth, upload.single('productImage'), ProductsController.create);
router.put('/:id', checkAuth, ProductsController.update);
router.patch('/:id', checkAuth, ProductsController.partialUpdate);
router.delete('/:id', checkAuth, ProductsController.deleteById);

module.exports = router;
