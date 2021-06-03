const categoryModel = require('../models/categoryModel')
const ApiError = require('../error/ApiError')

class categoryController {
	getAllItems(req, res, next){
		categoryModel.getAllItems(categories => {
			const {success, msg} = categories;
			if (success) {
				return res.json(msg)
			}
			return next(ApiError.badRequest('Categories not fount'))
		})
	}
	getAllProductsByCat(req, res, next){
		const { id } = req.params;
		if (!/^\d+$/.test(id)) {
			return res.status(500).send('Server Error');
		}
		categoryModel.getAllProductsByCat( id,structure => {
			const { success, msg } = structure;

			if (!success || msg.length === 0) {
				return next(ApiError.badRequest('Structure not fount'))
			}

			try {
				res.json(msg)
			} catch (e) {
				res.json({message: e.message})
			}
		})
	}
}

module.exports = new categoryController()
