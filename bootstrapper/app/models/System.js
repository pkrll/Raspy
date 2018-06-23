'use strict'

exports.isNodeAppRunning = appName => {
	const psNode = require('ps-node');

	return new Promise( (resolve, reject) => {
		psNode.lookup({
			command: 'node',
			arguments: appName
		}, function(error, result) {
			if (error) {
				reject({status: 0, error: error});
			} else {
				let isRunning = (result.length > 0);
				resolve({status: 1, running: isRunning, arguments: process.arguments, pid: process.pid});
			}
		})
	});
};

exports.getLogHistory = options => {
	const winston = require('winston').loggers.get('command-logger');

	return new Promise( (resolve, reject) => {
		winston.query(options, (error, results) => {
	     if (error) {
				 reject({status: 0, error: error});
	     } else {
				 let result = (results.file) ? results.file.reverse() : [];
				 resolve({status: 1, result: result});
			 }
	   });
	});
}
