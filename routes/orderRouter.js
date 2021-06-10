const Router = require('express');
const router = new Router()
const {orderController} = require('../controllers')

router.get('/checkout', orderController.getCheckoutInfo)
router.get('/get', orderController.getOrders)
router.post('/add', orderController.addOrder)

module.exports = router;
