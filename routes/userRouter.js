const Router = require('express');
const router = new Router()
const {userController} = require('../controllers')

router.post('/registration', userController.register)
router.post('/login', userController.login)
router.post('/check', userController.isValidUser)

module.exports = router;
