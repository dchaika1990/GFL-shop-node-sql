const DB = require('./DB')

class CategoryModel {
	async getAllItems(callback) {
		await DB.query('SELECT * FROM category', result => {
			callback(result);
		})
	}

	// async getOneStructure(id, callback) {
	// 	await DB.query('SELECT * FROM structure WHERE id_structure=?', [id], result => {
	// 		callback(result);
	// 	})
	// }
}

module.exports = new CategoryModel();
