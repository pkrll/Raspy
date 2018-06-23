'use strict'
const System = require('../models/System.js');

exports.isNodeAppRunning = (appName, callback) => {
	System.isNodeAppRunning(appName).then(response => {
		callback(response);
	}).catch(error => {
		callback(error);
	});
}

exports.getLogHistory = (options, callback) => {
	System.getLogHistory(options).then(response => {
		callback(response);
	}).catch(error => {
		callback(error);
	});
}
