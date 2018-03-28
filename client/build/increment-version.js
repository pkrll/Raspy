'use strict'
var fs = require('fs');

let semindex 	= 2;
let incrBuild = true;

let argv = process.argv.slice(2);

if (argv.length > 0) {
	for (let value of argv) {
		if (value.includes("--version=")) {
			value = value.split("=");
			if (value.length > 1) {
				if 			(value[1] == 'major') semindex = 0;
				else if (value[1] == 'minor') semindex = 1;
				else if (value[1] == 'patch') semindex = 2;
				else if (value[1] == 'build') semindex = -1;
			}
		} else if (value == '--skip-build') {
			incrBuild = false;
		}
	}
}

fs.readFile('package.json', function(err, data) {
	if (err) throw err;

	let content = JSON.parse(data);
	let version = content.version.split('+');

	if (version.length > 0) {
		if (semindex >= 0) {
			console.log("Incrementing version number...");
			let semver = version[0].split('.');
			semver[semindex] = parseInt(semver[semindex]) + 1;
			version[0] = semver.join('.');
		}

		if (incrBuild) {
			console.log("Incrementing build number...");
			version[1] = (parseInt("0x"+version[1]) + 1).toString(16);
		}
	}

	content.version = version.join('+');

  fs.writeFile('package.json', JSON.stringify(content, null, 2), function(err) {
		if(err) throw err;
		console.log("Current version: " + content.version);
	})
});
