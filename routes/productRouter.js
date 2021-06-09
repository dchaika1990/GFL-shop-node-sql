const Router = require('express');
const router = new Router()
const {productController} = require('../controllers')

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getOneProduct)

module.exports = router;
