const orderModel = require('../models/orderModel')
const ApiError = require('../error/ApiError')

class orderController {
	addOrder(req, res, next){
		const {id_user, country, city, state, delivery_address, postcode, payment_method, delivery_method, order_comments, order_full_price, date_of_order } = req.body;
		orderModel.addOrder(id_user, country, city, state, delivery_address, postcode, payment_method, delivery_method, order_comments, order_full_price, date_of_order, callback => {
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

	getOrders(req, res, next) {
		const {token} = req.query;
		let idUser = Buffer.from(token, 'base64').toString('utf-8').split('.')[0];
		orderModel.getOrders(idUser, callback => {
			const { success, msg } = callback;

			if (!success) {
				return next(ApiError.badRequest('Product not fount'))
			}

			try {
				res.json(msg)
			} catch (e) {
				res.json({message: e.message})
			}
		})
	}

	getOrder(req, res, next){
		const {id} = req.params;

		if (!/^\d+$/.test(id)) {
			return res.status(500).send('Server Error');
		}

		orderModel.getOrder( id,product => {
			const { success, msg } = product;

			if (!success || msg.length === 0) {
				return next(ApiError.badRequest('Order not fount'))
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
