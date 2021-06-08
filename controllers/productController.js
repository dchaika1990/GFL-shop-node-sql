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
		const {type, color} = req.query
		console.log(req.query);
		let variants = '';
		if (type) variants += ` and product_options.product_type=${type} `
		if (color) variants += ` and product_options.product_color=${color} `

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
}

module.exports = new productController()
