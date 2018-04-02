'use strict'
var fs = require('fs');

let semindex 	= 2;
let incrBuild = true;
let rsetBuild = false;
let rsetPatch = false;
let rsetMinor = false;

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
		} else if (value == '--reset-build') {
			rsetBuild = true;
		} else if (value == '--reset-patch') {
			rsetPatch = true;
		} else if (value == '--reset-minor') {
			rsetMinor = true;
		}
	}
}

fs.readFile('package.json', function(err, data) {
	if (err) throw err;

	let content = JSON.parse(data);
	let version = content.version.split('+');

	if (version.length > 0) {
		let semver = version[0].split('.');

		if (semindex >= 0) {
			if (semindex != 2 && rsetPatch) {
				semver[2] = 0;
			} else if (semindex != 1 && rsetMinor) {
				semver[1] = 0;
			}

			console.log("Incrementing version number...");
			semver[semindex] = parseInt(semver[semindex]) + 1;
			version[0] = semver.join('.');
		}

		if (incrBuild) {
			console.log("Incrementing build number...");
			version[1] = (parseInt("0x"+version[1]) + 1).toString(16);
		} else if (rsetBuild) {
			version[1] = 0;
		}
	}

	content.version = version.join('+');

  fs.writeFile('package.json', JSON.stringify(content, null, 2), function(err) {
		if(err) throw err;
		console.log("Current version: " + content.version);
	})
});
