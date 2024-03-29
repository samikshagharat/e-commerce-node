const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check_auth');
const ProductController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }

});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {

        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Product = require('../models/product');
console.log('routes');


router.get('/getAll', ProductController.product_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductController.product_creat_product);

router.get('/id/:productId', ProductController.product_get_product);

router.patch('/:productId', checkAuth, ProductController.product_uodte_product);

router.delete('/:productId', checkAuth, ProductController.product_delete);

module.exports = router;