const Router = require('express');
const router = new Router();
const productRouter = require('./productRouter')
const structureRouter = require('./structureRouter')

router.use('/product', productRouter)
router.use('/structure', structureRouter)

module.exports = router;
