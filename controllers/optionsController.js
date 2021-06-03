const optionsModel = require('../models/optionsModel')
const ApiError = require('../error/ApiError')

class optionsController {
	getAllItems(req, res, next){
		optionsModel.getAllItems(items => {
			const {success, msg} = items;
			if (success) {
				return res.json(msg)
			}
			return next(ApiError.badRequest(msg))
		})
	}
}

module.exports = new optionsController()
