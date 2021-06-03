const Router = require('express');
const router = new Router()
const {categoryController} = require('../controllers')

router.get('/', categoryController.getAllItems)
router.get('/:id', categoryController.getAllProductsByCat)

module.exports = router;
