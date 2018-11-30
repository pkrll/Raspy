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
		executeCommand('lsblk -o name,type,size -l -n').then(response => {
			let lines = response.split(/(\r?\n)/g);
			for (let index in lines) {
				if (lines[index] == '\n') continue;
				let line = lines[index].split(/[ \t]/g).filter((v) => v != '' && v != '\t');
				disks.push(line);
			}

			resolve(disks);

		}).catch(error => {
			reject(error);
		});
	});

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
