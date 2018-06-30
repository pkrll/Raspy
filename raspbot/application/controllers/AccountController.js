'use strict'
const account = require('../models/Account.js');

exports.updatePassword = (req, res) => {
	let password = req.body.password;
	account.updatePassword(password).then(response => {
		res.json({success: true});
	}).catch(error => {
		res.status(500).json({success: false, error: error.message});
	});
};
