const DB = require('./DB')

class ProductModel {
	async getAllProducts(callback) {
		await DB.query('SELECT * FROM products, structure WHERE products.product_structure=structure.id_structure', result => {
			callback(result);
		})
	}

	async getOneProducts(id, callback) {
		await DB.query('SELECT * FROM products, structure WHERE id_product=? and products.product_structure=structure.id_structure', [id], result => {
			callback(result);
		})
	}
}

module.exports = new ProductModel();
