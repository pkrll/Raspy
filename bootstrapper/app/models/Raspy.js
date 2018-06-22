'use strict'
exports.update = () => executeCommand('cd ../ && make update');

function executeCommand(command, argument = '') {
	const winston = require('winston').loggers.get('command-logger');

	return new Promise( (resolve, reject) => {
		const { exec } = require('child_process');
		exec(command, argument, (error, stdout, stderr) => {
			if (error) {
				winston.log('error', stderr);
				reject(stderr);
			} else {
				winston.log('info', stdout);
				resolve(stdout);
			}
		});
	});
}
