const Router = require('express');
const router = new Router()
const {cartController} = require('../controllers')

router.get('/get', cartController.getCartInfo)
router.post('/add', cartController.addToCart)

module.exports = router;
