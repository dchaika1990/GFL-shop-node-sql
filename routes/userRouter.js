const Router = require('express');
const router = new Router()
const {userController} = require('../controllers')

router.post('/registration', userController.register)
// router.get('/login', UserController.login)

module.exports = router;
