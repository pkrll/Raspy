'use strict'

exports.update   = callback => execute('cd ../ && make update', callback);
exports.install  = callback => execute('cd ../ && make install', callback);
exports.restart  = callback => execute('cd ../ && make restart', callback);
exports.stop 		 = callback => execute('cd ../ && make stop', callback);
exports.shutdown = callback => execute('cd ../ && make shutdown', callback);

function execute(process, callback) {
	const spawn 	= require('child_process').spawn;
	const command = spawn(process, { shell: true });

	let history = '';

	command.stdout.on('data', function (data) {
		history += data.toString();
		callback({
			status: 1,
			result: data.toString()
		});
	});

	command.stderr.on('data', function (data) {
		history += data.toString();
		callback({
			status: 0,
			error: { message: data.toString() }
		});
	});

	command.on('exit', function (code) {
		const winston = require('winston').loggers.get('command-logger');
		winston.log('info', history);
		callback({ status: -1 });
	});

}
