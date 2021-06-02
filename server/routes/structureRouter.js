const Router = require('express');
const router = new Router()
const {structureController} = require('../controllers')

router.get('/', structureController.getAllStructures)
router.get('/:id', structureController.getOneStructure)

module.exports = router;
