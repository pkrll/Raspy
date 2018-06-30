const system = require('../models/System.js');

exports.checkForUpdate = (req, res) => {
	system.checkForUpdate().then(response => {
		res.json({success: true, result: response});
	}).catch(error => {
		res.status(500).json({success: false, error: error.message});
	});
};

exports.launchBootstrapper = (req, res) => {
	system.launchBootstrapper().then(response => {
		const waitForLocalhost = require('wait-for-localhost');
		(async () => {
			await waitForLocalhost(5001);
			res.json({success: true, result: response});
		})();
	}).catch(error => {
		console.error(error);
		res.status(500).json({success: false, error: {message: "Could not launch bootstrapper."}});
	});
};
