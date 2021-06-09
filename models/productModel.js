const DB = require('./DB')

class ProductModel {
	async getAllProducts(catId, callback) {
		let sql = '';
		sql = catId
			? `SELECT P.id_product, P.product_name, P.product_description, P.product_price, P.product_count, S.structure_name, GROUP_CONCAT(I.image_name) as image_name, category.category_name FROM products as P, structure as S, product_gallery as PG, image as I, product_category as PC, category WHERE P.product_structure=S.id_structure and P.id_product=PG.id_product and PG.id_image=I.id_image and P.id_product=PC.id_product and PC.id_category=category.id_category and P.product_show='YES' and category.id_category=${catId} GROUP BY id_product`
			: 'SELECT P.id_product, P.product_name, P.product_description, P.product_price, P.product_count, S.structure_name, GROUP_CONCAT(DISTINCT I.image_name) as image_name, GROUP_CONCAT(DISTINCT C.category_name) as category_name FROM products as P, structure as S, product_gallery as PG, image as I, product_category as PC, category as C WHERE P.product_structure=S.id_structure and P.id_product=PG.id_product and PG.id_image=I.id_image and P.id_product=PC.id_product and PC.id_category=C.id_category and P.product_show="YES" and P.product_price!="null" GROUP BY id_product'
		await DB.query(sql, result => {
			callback(result);
		})
	}

	async getOneProducts(id, variants='', callback) {
		try {
			let product = {};
			const [productInfo] = await DB.promise().execute(`SELECT P.id_product, P.product_name, P.product_description, P.product_price, P.product_count, S.structure_name, GROUP_CONCAT(DISTINCT I.image_name) as image_name, GROUP_CONCAT(DISTINCT C.category_name) as category_name FROM products as P, structure as S, product_gallery as PG, image as I, product_category as PC, category as C WHERE P.product_structure=S.id_structure and P.id_product=PG.id_product and PG.id_image=I.id_image and P.id_product=PC.id_product and PC.id_category=C.id_category and P.product_show="YES" and P.product_price!="null" and P.id_product=${id}`);
			const [productOptions] = await DB.promise().execute(`select GROUP_CONCAT(DISTINCT product_options.id_options ) as id_options, GROUP_CONCAT(DISTINCT product_type.id_type) as id_type,GROUP_CONCAT(DISTINCT product_type.type_name Order By product_type.id_type) as type_name, GROUP_CONCAT(DISTINCT product_color.id_color ) as id_color, GROUP_CONCAT(DISTINCT product_color.color_name Order By product_color.id_color) as color_name, GROUP_CONCAT(DISTINCT product_color.color_code Order By product_color.id_color) as color_code, GROUP_CONCAT(DISTINCT product_size.id_size) as id_size, GROUP_CONCAT(DISTINCT product_size.size_name Order By product_size.id_size) as size_name from product_type, product_color, product_size, product_options where product_options.product_type=product_type.id_type and product_options.product_color=product_color.id_color and product_options.product_size=product_size.id_size ${variants} and product_options.id_product=?`, [id]);
			product.info = productInfo[0]
			product.options = productOptions[0]
			callback({success: true, msg: product});
		} catch (error) {
			callback({success: false, msg: JSON.stringify(error)});
		}
	}

	async addToCart(id_user, id_product, id_options, product_count, callback) {

		this.isExistProduct(id_user, id_options, product_count_before => {
			if (product_count_before) {
				DB.query(
					"UPDATE cart SET product_count=? WHERE cart.id_cart =?;",
					[product_count_before.product_count + product_count, product_count_before.id_cart],
					result => {
						const {success, msg} = result;
						if (!success) return callback(msg);
						return callback(result);
					}
				);
			} else {
				DB.query(
					"INSERT INTO cart VALUES (NULL, ?, ?, ?, ?)",
					[id_user, id_product, id_options, product_count],
					result => {
						const {success, msg} = result;
						if (!success) return callback(msg);
						callback(result);
					}
				);
			}
		});
	}

	isExistProduct(id_user, id_options, callback) {
		DB.query(
			'SELECT id_cart, product_count FROM cart WHERE id_user=? and id_options=? LIMIT 1',
			[id_user, id_options],
			result => {
				callback(result.msg[0]);
			}
		);
	}
}

module.exports = new ProductModel();
