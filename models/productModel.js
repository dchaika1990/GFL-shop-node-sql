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

	async getOneProductOption(id, callback) {
		await DB.query('SELECT product_options.id_product, product_type.type_name, product_color.color_name, product_size.size_name FROM product_options, product_type, product_color, product_size where id_product=? and product_options.product_type=product_type.id_type and product_options.product_color=product_color.id_color and product_options.product_size=product_size.id_size', [id], result => {
			callback(result);
		})
	}
}

module.exports = new ProductModel();
