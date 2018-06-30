'use strict'
const dashboard = require('../models/Dashboard.js');

exports.systemInformation = (req, res) => {
	dashboard.getSystemInformation().then(response => {
		res.json({success: true, result: response});
	}).catch(error => {
		res.status(500).json({success: false, error: error.message});
	});
};
