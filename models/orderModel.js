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

	async addOrder(id_user, country, city, state, delivery_address, postcode, payment_method, delivery_method, order_comments, order_full_price, date_of_order, callback) {
		DB.query(`INSERT INTO orders VALUES (NULL, ${+id_user}, '${country}', '${city}', '${state}', '${delivery_address}', '${postcode}', ${+payment_method}, ${+delivery_method}, '${order_comments}', ${+order_full_price}, '${date_of_order}', 2)`, async result => {
				const {success, msg} = result;
				if (!success) return callback(msg);

				let [id] = await DB.promise().execute('SELECT MAX(orders.id_order) FROM orders WHERE orders.id_user=?', [id_user])
				id = id[0]['MAX(orders.id_order)']
				let [CardOptions] = await DB.promise().execute('SELECT cart.id_product, cart.id_options, cart.product_count, cart.product_sum FROM cart WHERE cart.id_user=?', [id_user])
				let newString = '';
				let separator = ','
				CardOptions.forEach((option, index) => {
					if (CardOptions.length - 1 === index) separator = '';
					newString += `(${option.id_product}, ${option.id_options}, ${option.product_count}, ${option.product_sum}, ${id})${separator} `
				})

				DB.query(`insert into order_details(id_product, product_options, product_count, product_sum, id_order) VALUES ${newString}`, async result => {
					const {success, msg} = result;
					if (!success) return callback(msg);

					DB.query(`DELETE FROM cart WHERE cart.id_user=${id_user}`, async result => {
						const {success, msg} = result;
						if (!success) return callback(msg);
						console.log(msg)
						callback(result);
					})
				})
			}
		);


		//insert into order_details(id_product, product_options, product_count, product_sum, id_order) VALUES (1, 3, 4, 180, 10), (8, 16, 1, 45, 10)
		//DELETE FROM cart WHERE cart.id_user = 5
		// console.log(newString)
	}
}

module.exports = new OrderModel();
