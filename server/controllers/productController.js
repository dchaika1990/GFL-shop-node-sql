const productModel = require('../models/productModel')

class productController {
	getAllProducts(req, res){
		productModel.getAllProducts(products => {
			res.json(products)
		})
	}
	getOneProduct(req, res){
		const { id } = req.params;
		if (!/^\d+$/.test(id)) {
			return res.status(500).send('Server Error');
		}
		productModel.getOneProducts( id,product => {
			const { success, msg } = product;

			if (!success || msg.length === 0) {
				return res.status(404).json({message: 'Product not fount'});
			}

			res.json(msg[0])
		})
	}
}

module.exports = new productController()
