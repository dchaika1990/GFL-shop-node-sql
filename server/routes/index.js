const Router = require('express');
const router = new Router();
const productRouter = require('./productRouter')

router.use('/product', productRouter)

module.exports = router;
