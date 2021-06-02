const structureModel = require('../models/structureModel')
const ApiError = require('../error/ApiError')

class structureController {
	getAllStructures(req, res, next){
		structureModel.getAllStructures(structures => {
			const {success, msg} = structures;
			if (success) {
				return res.json(msg)
			}
			return next(ApiError.badRequest('Structures not fount'))
		})
	}
	getOneStructure(req, res, next){
		const { id } = req.params;
		if (!/^\d+$/.test(id)) {
			return res.status(500).send('Server Error');
		}
		structureModel.getOneStructure( id,structure => {
			const { success, msg } = structure;

			if (!success || msg.length === 0) {
				return next(ApiError.badRequest('Structure not fount'))
			}

			try {
				res.json(msg[0])
			} catch (e) {
				res.json({message: e.message})
			}
		})
	}
}

module.exports = new structureController()
