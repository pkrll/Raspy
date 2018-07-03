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

const retrieveClientIP = req => {
	if (req.headers == null || req.headers.authorization == null) {
		return null;
	}

	return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

const verify = req => {
	const credential = decodeTokenAuth(req);
	const clientIP = retrieveClientIP(req);

	return (credential && clientIP && token.check(credential, clientIP));
}

module.exports = databasePath => {

	const auth = {

		verify: verify,

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
							const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
							token.save(userToken, clientIP, user.username);
							resolve(userToken);
						});
					});
				} else {
					reject(Error("User not found."));
				}
			});
		},

		isAuthorized: (req, res, next) => {
			if (verify(req)) { return next(); }

			return res.status(401).json({
				success: false,
				error: {
					message: 'Unauthorized access.'
				}
			});
		},

		updatePassword: (req, res) => {
			const credential = decodeTokenAuth(req);
			if (credential) {
				const username = token.getUsernameFromToken(credential);
				const password = req.body.password;
				const database = require('lowdb')(new FileSync(databasePath));
				const userInfo = database.get('users').find({ username: username }).value();

				if (userInfo) {
					bcrypt.hash(password, 10, function(err, hash) {
						userInfo.password = hash;
						database.write();
						res.json({ success: true });
					});
				} else {
					res.json({ success: false, error: { message: 'User not found.'}});
				}
			}
		}
	}

	return auth;
}
