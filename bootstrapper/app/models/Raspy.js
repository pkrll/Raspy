'use strict'

exports.update = () => executeCommand('cd ../ && make update');

function executeCommand(command, argument = '') {
	return new Promise( (resolve, reject) => {
		const { exec } = require('child_process');
		exec(command, argument, (error, stdout, stderr) => {
			if (error) {
				reject(stderr);
			} else {
				resolve(stdout);
			}
		});
	});
}
