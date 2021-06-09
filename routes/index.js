const Router = require('express');
const router = new Router();
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const optionsRouter = require('./optionsRouter')
const userRouter = require('./userRouter')
const cartRouter = require('./cartRouter')

router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/options', optionsRouter)
router.use('/auth', userRouter)
router.use('/cart', cartRouter)

module.exports = router;
