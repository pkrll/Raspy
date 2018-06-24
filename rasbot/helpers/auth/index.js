'use strict'
const bcrypt = require('bcrypt');
const parser = require('./parser.js');
const FileSync = require('lowdb/adapters/FileSync');

module.exports = databasePath => {

	const database = require('lowdb')(new FileSync(databasePath));

	const auth = {

		authenticate: (data, callback) => {
			let username = data.username;
			let password = data.password;
			let response = { status: 0, error: { message: 'No username given.' } };

			if (username == undefined || username == null) { callback(response); }

			const credentials = database.get('users').find({ username: username }).value();

			if (credentials != undefined) {
				bcrypt.compare(password, credentials.password, (err, res) => {
				  if(res) {
						let response = {
							status: 1,
							result: {
								token: '1234'
							}
						};

						callback(response);
				  } else {
						response.error.message = 'Wrong username or password!';
						callback(response);
				  }
				});
			} else {
				response.error.message = 'Username not found!';
				callback(response);
			}
		},

		isAuthorized: (req, res, next) => {
			const credentials = parser(req.headers.authorization);
			console.log(credentials);
			// if (credentials && checkAuth(credentials.username, credentials.token)) {
			// 	return next();
			// }

			return res.status(401).json({status: 0, error: { message: 'Unauthorized' } });
		}
	}

	return auth;
}
