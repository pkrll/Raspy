const oauth = require('../../config/index.js').oauth;

exports.reboot = () => {
	return executeCommand('cd ../ && make system_reboot');
};

exports.shutdown = () => {
	return executeCommand('cd ../ && make system_shutdown');
};

function executeCommand(command, options = []) {
  return new Promise((resolve, reject) => {
		const { exec } = require('child_process');
		exec('top', options, (error, stdout, stderr) => {
			if (error) {
				reject(stderr);
			} else {
				resolve(stdout);
			}
		});
  });
}
