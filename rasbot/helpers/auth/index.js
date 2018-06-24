'use strict'
const parser = require('./parser.js');

exports.authenticate = (data, callback) => {
	let username = data.username;
	let password = data.password;
	let response = { status: 0, error: { message: 'No username given.' } };

	if (username == undefined || username == null) { callback(response); }

	if (username == 'admin' && password == 'secret') {
		const token = '12345';

		response.status = 1;
		response.error = {};
		response.result = { token: token };
	} else {
		response.error.message = 'Wrong username or password.';
	}

	callback(response);
}

exports.isAuthorized = (req, res, next) => {
	const credentials = parser(req.headers.authorization);
	console.log(credentials);
	// if (credentials && checkAuth(credentials.username, credentials.token)) {
	// 	return next();
	// }

	return res.status(401).json({status: 0, error: { message: 'Unauthorized' } });
}
