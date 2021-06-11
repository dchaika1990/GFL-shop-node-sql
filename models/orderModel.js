const DB = require('./DB')

class OrderModel {
	async getCheckoutInfo(id, callback) {
		const payment_method = await DB.promise().execute('Select payment_method.id_payment_method as id, payment_method.name_payment_method as name from payment_method')
		const delivery_method = await DB.promise().execute('Select delivery_method.id_delivery_method as id, delivery_method.name_delivery as name from delivery_method')
		const price_options = await DB.promise().execute('SELECT products.product_name as name, cart.product_count as count, cart.product_sum as sum from products, cart where cart.id_product=products.id_product and cart.id_user=?', [id])
		callback({
			success: true, msg: {
				payment_method: payment_method[0],
				delivery_method: delivery_method[0],
				price_options: price_options[0],
			}
		});
	}

	async addOrder(id_user, country, city, state, delivery_address, postcode, payment_method, delivery_method, order_comments, order_full_price, date_of_order, callback) {
		try {
			let [orders] = await DB.promise().execute(`INSERT INTO orders VALUES (NULL, ${+id_user}, '${country}', '${city}', '${state}', '${delivery_address}', '${postcode}', ${+payment_method}, ${+delivery_method}, '${order_comments}', ${+order_full_price}, '${date_of_order}', 2)`)

			if (orders.length === 0) {
				return callback({success: false, msg: 'Order did not create'});
			}

			let [idUser] = await DB.promise().execute('SELECT MAX(orders.id_order) FROM orders WHERE orders.id_user=?', [id_user])

			if (idUser.length === 0) {
				return callback({success: false, msg: 'Did not get user id'});
			}

			let [CardOptions] = await DB.promise().execute('SELECT cart.id_product, cart.id_options, cart.product_count, cart.product_sum FROM cart WHERE cart.id_user=?', [id_user])

			if (CardOptions.length === 0) {
				return callback({success: false, msg: 'Did not get cart options'});
			}


			let newString = '';
			let separator = ',';
			CardOptions.forEach((option, index) => {
				if (CardOptions.length - 1 === index) separator = '';
				newString += `(${option.id_product}, ${option.id_options}, ${option.product_count}, ${option.product_sum}, ${idUser[0]['MAX(orders.id_order)']})${separator} `
			})

			let [order_details] = await DB.promise().execute(`insert into order_details(id_product, product_options, product_count, product_sum, id_order) VALUES ${newString}`)

			if (order_details.length === 0) {
				return callback({success: false, msg: 'Did not push cart options into order details'});
			}

			let [clean_cart] = await DB.promise().execute(`DELETE FROM cart WHERE cart.id_user=${id_user}`)

			if (clean_cart.length === 0) {
				return callback({success: false, msg: 'Did not clean cart'});
			}
			callback({success: true, msg: 'Added order'});
		} catch (error) {
			callback({success: false, msg: JSON.stringify(error)});
		}
	}

	async getOrders(id, callback){
		await DB.query('SELECT orders.id_order, orders.id_user, orders.country, orders.city, orders.state, orders.delivery_address, orders.postcode, orders.order_comments, orders.order_full_price, orders.date_of_order, payment_method.name_payment_method, delivery_method.name_delivery, order_status.name_order_status FROM orders, payment_method, delivery_method, order_status WHERE orders.payment_method=payment_method.id_payment_method and orders.delivery_method=delivery_method.id_delivery_method and orders.order_status=order_status.id_order_status and orders.id_user=?',[id], result => {
			const {success, msg} = result;
			if (!success) return callback(msg);
			return callback(result);
		})
	}

	async getOrder(id, callback){
		// await DB.query('SELECT orders.id_order, orders.id_user, orders.country, orders.city, orders.state, orders.delivery_address, orders.postcode, orders.order_comments, orders.order_full_price, orders.date_of_order, payment_method.name_payment_method, delivery_method.name_delivery, order_status.name_order_status FROM orders, payment_method, delivery_method, order_status WHERE orders.payment_method=payment_method.id_payment_method and orders.delivery_method=delivery_method.id_delivery_method and orders.order_status=order_status.id_order_status and orders.id_order=?',[id], result => {
		// 	const {success, msg} = result;
		// 	if (!success) return callback(msg);
		// 	return callback(result);
		// })
		try {
			let [orderInfo] = await DB.promise().execute('SELECT orders.id_order, orders.id_user, orders.country, orders.city, orders.state, orders.delivery_address, orders.postcode, orders.order_comments, orders.order_full_price, orders.date_of_order, payment_method.name_payment_method, delivery_method.name_delivery, order_status.name_order_status FROM orders, payment_method, delivery_method, order_status WHERE orders.payment_method=payment_method.id_payment_method and orders.delivery_method=delivery_method.id_delivery_method and orders.order_status=order_status.id_order_status and orders.id_order=?',[id])
			if (orderInfo.length === 0) {
				return callback({success: false, msg: 'Order did not found'});
			}

			let [orderProductsInfo] = await DB.promise().execute('Select products.product_name, product_type.type_name, product_color.color_name, product_size.size_name, order_details.product_count, order_details.product_sum from products, orders, order_details, product_options, product_type, product_color, product_size where order_details.id_order=orders.id_order and order_details.product_options=product_options.id_options and product_options.product_type=product_type.id_type and product_options.product_color=product_color.id_color and product_options.product_size=product_size.id_size and order_details.id_product=products.id_product and orders.id_order=?', [id])
			if (orderProductsInfo.length === 0) {
				return callback({success: false, msg: 'Order did not found'});
			}

			callback({
				success: true, msg: {
					orderInfo: orderInfo[0],
					orderProductsInfo: orderProductsInfo[0],
				}
			});
		} catch (error) {
			callback({success: false, msg: JSON.stringify(error)});
		}
	}
}

module.exports = new OrderModel();
