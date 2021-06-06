const Database = require('./DB');

class UserModel{
	isExists(user_login, user_email, callback) {
		Database.query(
			'SELECT COUNT(id) as `exists` FROM users WHERE user_login=? or user_email=? LIMIT 1',
			[user_login, user_email],
			result => {
				callback(result.msg[0].exists === 1);
			}
		);
	}

	async register(user_login, user_name, user_email, user_password, user_phone, callback) {
		if (!user_login)
			return callback({
				success: false,
				msg: 'Login is required',
			});

		if (!user_name)
			return callback({
				success: false,
				msg: 'Name is required',
			});

		if (!user_email)
			return callback({
				success: false,
				msg: 'Email is required',
			});

		if (!user_phone)
			return callback({
				success: false,
				msg: 'Phone is required',
			});

		if (!user_password)
			return callback({
				success: false,
				msg: 'Password is required',
			});

		this.isExists(user_login, user_email, isExists => {
			if (isExists)
				return callback({
					success: false,
					msg: 'User already exists',
				});
		});
		let status = await Database.promise().execute('Select id_status from user_status where user_status.status_name="User"')
		console.log(user_login, user_name, user_email, user_password, user_phone, status[0][0].id_status)
		Database.query(
			"INSERT INTO users VALUES (NULL, ?, SHA1(?), ?, ?, ?, ?, '')",
			[user_login, user_password, user_name, user_phone, user_email, status[0][0].id_status],
			result => {
				const {success, msg} = result;
				if (!success) return callback(msg);
				callback(result);
			}
		);
	}

	async isValidToken(token, callback) {
		try {
			const [userToken] = await Database.promise().execute(
				'SELECT user_login, user_token FROM users WHERE user_token=? LIMIT 1',
				[token]
			);

			callback(userToken.length !== 0);
		} catch (error) {
			callback(false);
		}
	}
}

module.exports = new UserModel();
