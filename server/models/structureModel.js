const DB = require('./DB')

class StructureModel {
	async getAllStructures(callback) {
		await DB.query('SELECT * FROM structure', result => {
			callback(result);
		})
	}

	async getOneStructure(id, callback) {
		await DB.query('SELECT * FROM structure WHERE id_structure=?', [id], result => {
			callback(result);
		})
	}
}

module.exports = new StructureModel();
