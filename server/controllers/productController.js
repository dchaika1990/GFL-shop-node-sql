const productModel = require('../models/productModel')
const ApiError = require('../error/ApiError')

class productController {
	getAllProducts(req, res, next){
		productModel.getAllProducts(products => {
			const {success, msg} = products;
			if (success) {
				return res.json(msg)
			}
			return next(ApiError.badRequest('Products not fount'))
		})
	}
	getOneProduct(req, res, next){
		const { id } = req.params;
		if (!/^\d+$/.test(id)) {
			return res.status(500).send('Server Error');
		}
		productModel.getOneProducts( id,product => {
			const { success, msg } = product;

			if (!success || msg.length === 0) {
				return next(ApiError.badRequest('Product not fount'))
			}

			try {
				res.json(msg[0])
			} catch (e) {
				res.json({message: e.message})
			}
		})
	}
	getOneProductOption(req, res, next){
		const { id } = req.params;
		if (!/^\d+$/.test(id)) {
			return res.status(500).send('Server Error');
		}
		productModel.getOneProductOption( id,product => {
			const { success, msg } = product;

			if (!success || msg.length === 0) {
				return next(ApiError.badRequest('Product not fount'))
			}

			try {
				res.json(msg[0])
			} catch (e) {
				res.json({message: e.message})
			}
		})
	}
}

module.exports = new productController()
