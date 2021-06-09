const DB = require('./DB')

class OrderModel {
	async getCheckoutInfo(id, callback) {
		const payment_method = await DB.promise().execute('Select payment_method.id_payment_method as id, payment_method.name_payment_method as name from payment_method')
		const delivery_method = await DB.promise().execute('Select delivery_method.id_delivery_method as id, delivery_method.name_delivery as name from delivery_method')
		const price_options = await DB.promise().execute('SELECT products.product_name as name, cart.product_count as count, cart.product_sum as sum from products, cart where cart.id_product=products.id_product and cart.id_user=?',[id])
		callback({success: true, msg: {
			payment_method: payment_method[0],
			delivery_method: delivery_method[0],
			price_options: price_options[0],
		}});
	}

	async addOrder(id_user, id_product, id_options, product_count, product_sum, callback) {

	}
}

module.exports = new OrderModel();
