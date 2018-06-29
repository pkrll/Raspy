const system = require('../models/System.js');

exports.checkForUpdate = (req, res) => {
	system.checkForUpdate().then(response => {
		res.json({success: true, result: response});
	}).catch(error => {
		res.status(500).json({success: false, error: error.message});
	});
}
