const userModel = require('../models/userModel');
const ApiError = require('../error/ApiError')

class UserController {
	register(req, res, next) {
		const {user_login, user_name, user_email, user_password, user_phone} = req.body;
		userModel.register(user_login, user_name, user_email, user_password, user_phone, result => {
			const {success, msg} = result;
			if (!success){
				return next(ApiError.badRequest(msg))
			}
			userModel.login(user_login,user_password, result => {
				const {success, msg} = result;
				if (!success){
					return next(ApiError.badRequest(msg))
				}
				res.json(msg)
			})
		})
	}

	login(req, res, next) {
		const {user_login, user_password} = req.body;
		userModel.login(user_login,user_password, result => {
			const {success, msg} = result;
			if (!success){
				return next(ApiError.badRequest(msg))
			}
			res.json(msg)
		})
	}

	isValidUser(req, res) {
		const {user_token} = req.body

		userModel.isValidToken(user_token || '', isValid => {
			res.json(isValid)
		});
	}
}
module.exports = new UserController()

