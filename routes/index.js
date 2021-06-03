const Router = require('express');
const router = new Router();
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const optionsRouter = require('./optionsRouter')

router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/options', optionsRouter)

module.exports = router;
