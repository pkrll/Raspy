'use strict'
const Raspy = require('../models/Raspy.js');

exports.update = (callback) => {
	Raspy.update().then(response => {
		callback({status: 1, result: response});
	}).catch(error => {
		console.log(error);
		callback({status: 0, error: error});
	});
}
