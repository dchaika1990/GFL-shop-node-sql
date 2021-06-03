const DB = require('./DB')

class optionsModel {
	async getAllItems(callback) {
		let AllResult = {};
		AllResult.msg = {};
		try {
			let product_type = await  DB.promise().execute(
				'SELECT * FROM product_type'
			)
			AllResult.msg.product_type = product_type[0]

			let product_color = await  DB.promise().execute(
				'SELECT * FROM product_color'
			)
			AllResult.msg.product_color = product_color[0]

			let product_size = await  DB.promise().execute(
				'SELECT * FROM product_size'
			)
			AllResult.msg.product_size = product_size[0]
			AllResult.success = true;
			await callback(AllResult)
		} catch (error) {
			callback({success: false, msg: JSON.stringify(error)});
		}
	}

	async getOneProductOption(id, callback) {
		await DB.query('SELECT product_options.id_product, product_type.type_name, product_color.color_name, product_size.size_name FROM product_options, product_type, product_color, product_size where id_product=? and product_options.product_type=product_type.id_type and product_options.product_color=product_color.id_color and product_options.product_size=product_size.id_size', [id], result => {
			callback(result);
		})
	}
}

module.exports = new optionsModel();
