const userModel = require('../models/userModel');

class UserController {
	register(req, res) {
		const {user_login, user_name, user_email, user_password, user_phone} = req.body;
		userModel.register(user_login, user_name, user_email, user_password, user_phone, result => {
			const {success, msg} = result;
			if (success){
				console.log(msg)
				res.json(msg)
			}
		})
	}

	login(req, res) {

	}
}
module.exports = new UserController()

