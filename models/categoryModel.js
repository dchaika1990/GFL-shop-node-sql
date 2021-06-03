const DB = require('./DB')

class CategoryModel {
	async getAllItems(callback) {
		await DB.query('SELECT * FROM category', result => {
			callback(result);
		})
	}

	async getAllProductsByCat(id, callback) {
		await DB.query('SELECT * FROM product_category, products WHERE id_category=? and product_category.id_product=products.id_product', [id], result => {
			callback(result);
		})
	}
}

module.exports = new CategoryModel();
