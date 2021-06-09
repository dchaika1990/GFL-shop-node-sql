const orderModel = require('../models/orderModel')
const ApiError = require('../error/ApiError')

class orderController {
	addOrder(req, res, next){

	}

	getCheckoutInfo(req, res, next) {
		const {token} = req.query;
		let idUser = Buffer.from(token, 'base64').toString('utf-8').split('.')[0];
		orderModel.getCheckoutInfo(idUser,callback => {
			const { success, msg } = callback;

			if (!success || msg.length === 0) {
				return next(ApiError.badRequest('Product not fount'))
			}

			try {
				res.json(msg)
			} catch (e) {
				res.json({message: e.message})
			}
		})
	}
}

module.exports = new orderController()
