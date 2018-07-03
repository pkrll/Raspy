const oauth = require('../../config/index.js').oauth;

exports.reboot = () => {
	return executeCommand('cd ../ && make system_reboot');
};

exports.shutdown = () => {
	return executeCommand('cd ../ && make system_shutdown');
};

function executeCommand(command, arguments = '') {
  return new Promise(
    (resolve, reject) => {
      const { exec } = require('child_process');
      exec(command, arguments, (error, stdout, stderr) => {
        if (error) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      });
    }
  );
}
