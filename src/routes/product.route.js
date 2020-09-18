const router  = require('express').Router()
const productController  = require('../controllers/product.controller');
var multipart = require('connect-multiparty');
var multipartmiddleware = multipart({uploadDir:'./Uploads'});

router.post('/',productController.createProduct);
router.get('/',productController.getProducts);
router.get('/:id',productController.getProduct);
router.get('/by/:categoria',productController.getProductsByCategory);
router.put('/:id',multipartmiddleware,productController.uploadImage);
router.get('/getimage/:image',productController.getFile);


module.exports= router
