'use strict'
const Raspy = require('../models/Raspy.js');

exports.update = (callback) => {
	Raspy.update(callback);
}

exports.install = (callback) => {
	Raspy.install(callback);
}

exports.restart = (callback) => {
	Raspy.restart(callback);
}

exports.stop = (callback) => {
	Raspy.stop(callback);
}

exports.shutdown = (callback) => {
	Raspy.shutdown(callback);
}
