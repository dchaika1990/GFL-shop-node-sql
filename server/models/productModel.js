const DB = require('./DB')

class ProductModel {
	getAllProducts(callback) {
		DB.query('SELECT * FROM products', result => {
			callback(result);
		})
	}

	getOneProducts(id, callback) {
		DB.query('SELECT * FROM products WHERE id_product=?', [id], result => {
			callback(result);
		})
	}
}

module.exports = new ProductModel();
