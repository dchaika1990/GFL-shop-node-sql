const Router = require('express');
const router = new Router()
const {optionsController} = require('../controllers')

router.get('/', optionsController.getAllItems)

module.exports = router;
