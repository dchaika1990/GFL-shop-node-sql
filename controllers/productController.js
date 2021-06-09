const productModel = require('../models/productModel')
const ApiError = require('../error/ApiError')

class productController {
	getAllProducts(req, res, next){
		const {categoryId} = req.query
		productModel.getAllProducts(categoryId,products => {
			const {success, msg} = products;
			if (success) {
				if (categoryId) {
					if (!/^\d+$/.test(categoryId)) {
						return next(ApiError.internal('Server Error'))
					}
				}
				return res.json(msg)
			}
			return next(ApiError.badRequest('Products not fount'))
		})
	}
	getOneProduct(req, res, next){
		const {id} = req.params;
		const {type, color, size} = req.query
		let variants = '';
		if (type) variants += ` and product_options.product_type=${type} `
		if (color) variants += ` and product_options.product_color=${color} `
		if (size) variants += ` and product_options.product_size=${size} `

		if (!/^\d+$/.test(id)) {
			return res.status(500).send('Server Error');
		}
		productModel.getOneProducts( id, variants,product => {
			const { success, msg } = product;

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

	addToCart(req, res, next){
		const {method} = req;
		if (method === 'POST') {
			const {id_user, id_product, id_options, product_count} = req.body
			productModel.addToCart(id_user, id_product, id_options, product_count, callback => {
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
}

module.exports = new productController()
