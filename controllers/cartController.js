const cartModel = require('../models/cartModel')
const ApiError = require('../error/ApiError')

class cartController {
	addToCart(req, res, next){
		const {id_user, id_product, id_options, product_count, product_sum} = req.body
		cartModel.addToCart(id_user, id_product, id_options, product_count, product_sum, callback => {
			const { success, msg } = callback;
			if (!success || msg.length === 0) {
				return next(ApiError.badRequest('Something went wrong'))
			}
			try {
				res.json(msg)
			} catch (e) {
				res.json({message: e.message})
			}
		})
	}

	getCartInfo(req, res, next) {
		const {token} = req.query
		let idUser = Buffer.from(token, 'base64').toString('utf-8').split('.')[0];
		cartModel.getCartInfo(idUser, callback =>{
			const { success, msg } = callback;
			if (!success || msg.length === 0) {
				return next(ApiError.badRequest('Something went wrong'))
			}
			try {
				res.json(msg)
			} catch (e) {
				res.json({message: e.message})
			}
		})
	}
}

module.exports = new cartController()
