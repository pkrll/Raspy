const oauth = require('../../config/index.js').oauth;

exports.reboot = () => {
	return executeCommand('cd ../ && make system_reboot');
};

exports.shutdown = () => {
	return executeCommand('cd ../ && make system_shutdown');
};

exports.getDisks = () => {
	return new Promise((resolve, reject) => {
		let disks = [];
		executeCommand('lsblk -lnJ -o name,type,size,mountpoint').then(response => {
			const json = JSON.parse(response);
			resolve(json['blockdevices']);
		}).catch(error => {
			reject(error);
		});
	});
}

exports.mount = (device, mountpoint) => {
	return executeCommand('sudo mount ' + device + ' ' + mountpoint);
}

exports.umount = mountpoint => {
	return executeCommand('sudo umount ' + mountpoint);
}

function executeCommand(command, options = []) {
	return new Promise((resolve, reject) => {
		const { exec } = require('child_process');
		exec(command, options, (error, stdout, stderr) => {
			if (error) {
				reject(stderr);
			} else {
				resolve(stdout);
			}
		});
	});
}
