const DB = require('./DB')

class StructureModel {
	getAllStructures(callback) {
		DB.query('SELECT * FROM structure', result => {
			callback(result);
		})
	}

	getOneStructure(id, callback) {
		DB.query('SELECT * FROM structure WHERE id_structure=?', [id], result => {
			callback(result);
		})
	}
}

module.exports = new StructureModel();
