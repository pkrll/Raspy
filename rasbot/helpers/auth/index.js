'use strict'
const bcrypt 	 = require('bcrypt');
const parser 	 = require('./parser.js');
const token 	 = require('./token.js');
const FileSync = require('lowdb/adapters/FileSync');

const decodeBasicAuth = req => {
	if (req.headers == null || req.headers.authorization == null) {
		return null;
	}

	return parser.basicAuth(req.headers.authorization);
}

const decodeTokenAuth = req => {
	if (req.headers == null || req.headers.authorization == null) {
		return null;
	}

	return parser.tokenAuth(req.headers.authorization);
}

module.exports = databasePath => {

	const auth = {

		authenticate: req => {
			return new Promise((resolve, reject) => {
				let credentials = decodeBasicAuth(req);

				if (!credentials) {
					reject(Error("Missing headers."));
				}

				let username = credentials.username;
				let password = credentials.password;

				if (username == undefined || username == null) {
					reject(Error("Missing username."));
				}

				const lowdb = require('lowdb')(new FileSync(databasePath));
				const user  = lowdb.get('users').find({ username: username }).value();

				if (user != undefined) {
					bcrypt.compare(password, user.password, (err, res) => {
						if (err != null) { reject(err); }
						if (res == false) {
							reject(Error("Wrong username or password!"));
						}

						token.generate((error, userToken) => {
							if (error) { throw error; }
							token.save(userToken);
							resolve(userToken);
						});
					});
				} else {
					reject(Error("User not found."));
				}
			});
		},

		isAuthorized: (req, res, next) => {
			const credential = decodeTokenAuth(req);

			if (credential && token.check(credential)) {
				return next();
			}

			return res.status(401).json({status: 0, error: { message: 'Unauthorized access.' } });
		}
	}

	return auth;
}
