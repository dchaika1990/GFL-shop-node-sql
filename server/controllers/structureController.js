const structureModel = require('../models/structureModel')

class structureController {
	getAllStructures(req, res){
		structureModel.getAllStructures(structures => {
			res.json(structures)
		})
	}
	getOneStructure(req, res){
		const { id } = req.params;
		if (!/^\d+$/.test(id)) {
			return res.status(500).send('Server Error');
		}
		structureModel.getOneStructure( id,structure => {
			const { success, msg } = structure;

			if (!success || msg.length === 0) {
				return res.status(404).json({message: 'Structure not fount'});
			}

			res.json(msg[0])
		})
	}
}

module.exports = new structureController()
