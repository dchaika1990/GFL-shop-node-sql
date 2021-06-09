const Router = require('express');
const router = new Router()
const {orderController} = require('../controllers')

router.get('/get', orderController.addOrder)
router.post('/add', orderController.addOrder)

module.exports = router;
