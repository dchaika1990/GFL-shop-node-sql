const DB = require('./DB')

class ProductModel {
	async getAllProducts(catId, callback) {
		let sql = '';
		sql = catId
			? `SELECT P.id_product, P.product_name, P.product_description, P.product_price, S.structure_name, GROUP_CONCAT(I.image_name) as image_name, category.category_name FROM products as P, structure as S, product_gallery as PG, image as I, product_category as PC, category WHERE P.product_structure=S.id_structure and P.id_product=PG.id_product and PG.id_image=I.id_image and P.id_product=PC.id_product and PC.id_category=category.id_category and P.product_show='YES' and category.id_category=${catId} GROUP BY id_product`
			: 'SELECT P.id_product, P.product_name, P.product_description, P.product_price, P.product_show, S.structure_name, GROUP_CONCAT(DISTINCT I.image_name) as image_name, GROUP_CONCAT(DISTINCT C.category_name) as category_name FROM products as P, structure as S, product_gallery as PG, image as I, product_category as PC, category as C WHERE P.product_structure=S.id_structure and P.id_product=PG.id_product and PG.id_image=I.id_image and P.id_product=PC.id_product and PC.id_category=C.id_category and P.product_show="YES" and P.product_price!="null" GROUP BY id_product'
		// if (id){
		// 	sql = `SELECT P.id_product, P.product_name, P.product_description, P.product_price, S.structure_name, GROUP_CONCAT(I.image_name) as image_name, category.category_name FROM products as P, structure as S, product_gallery as PG, image as I, product_category as PC, category WHERE P.product_structure=S.id_structure and P.id_product=PG.id_product and PG.id_image=I.id_image and P.id_product=PC.id_product and PC.id_category=category.id_category and P.product_show='YES' and category.id_category=${id} GROUP BY id_product`
		// } else {
		// 	sql = 'SELECT P.id_product, P.product_name, P.product_description, P.product_price, S.structure_name, GROUP_CONCAT(DISTINCT I.image_name) as image_name, GROUP_CONCAT(DISTINCT C.category_name) as category_name FROM products as P, structure as S, product_gallery as PG, image as I, product_category as PC, category as C WHERE P.product_structure=S.id_structure and P.id_product=PG.id_product and PG.id_image=I.id_image and P.id_product=PC.id_product and PC.id_category=C.id_category GROUP BY id_product'
		// }
		await DB.query(sql, result => {
			callback(result);
		})
	}

	async getOneProducts(id, callback) {
		await DB.query(`SELECT P.*, S.structure_name, GROUP_CONCAT(DISTINCT I.id_image) as id_image, GROUP_CONCAT(DISTINCT I.image_name) as image_name, GROUP_CONCAT(DISTINCT C.id_category) as id_category, GROUP_CONCAT(DISTINCT C.category_name) as category_name FROM products as P, structure as S, product_gallery as PG, image as I, product_category as PC, category as C WHERE P.product_structure=S.id_structure and P.id_product=PG.id_product and PG.id_image=I.id_image and P.id_product=PC.id_product and PC.id_category=C.id_category and P.id_product=${id} GROUP BY id_product`, [id], result => {
			callback(result);
		})
	}
}

module.exports = new ProductModel();
