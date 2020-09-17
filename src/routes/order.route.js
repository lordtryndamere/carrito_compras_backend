const router  = require('express').Router()
const orderController  = require('../controllers/order.controller');

router.post('/',orderController.createOrder);
router.get('/',orderController.getOrders);


module.exports = router;