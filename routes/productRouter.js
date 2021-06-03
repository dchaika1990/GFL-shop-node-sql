const Router = require('express');
const router = new Router()
const {productController} = require('../controllers')

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getOneProduct)
router.get('/option/:id', productController.getOneProductOption)

module.exports = router;
