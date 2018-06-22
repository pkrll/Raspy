'use strict'
const Raspy = require('../models/Raspy.js');

exports.update = (callback) => {
	Raspy.update().then(response => {
		callback({status: 1, result: response});
	}).catch(error => {
		callback({status: 0, error: error});
	});
}

exports.install = (callback) => {
	Raspy.install().then(response => {
		callback({status: 1, result: response});
	}).catch(error => {
		callback({status: 0, error: error});
	});
}

exports.restart = (callback) => {
	Raspy.restart().then(response => {
		callback({status: 1, result: response});
	}).catch(error => {
		callback({status: 0, error: error});
	});
}

exports.stop = (callback) => {
	Raspy.stop().then(response => {
		callback({status: 1, result: response});
	}).catch(error => {
		callback({status: 0, error: error});
	});
}
