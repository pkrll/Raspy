'use strict'
var fs = require('fs');
console.log("Incrementing build number...");
fs.readFile('package.json', function(err, data) {
	if (err) throw err;

	let content = JSON.parse(data);
	let version = content.version.split('+');

	if (version.length > 0) {
		version[1] = (parseInt(version[1]) + 1).toString(16);
	}

	content.version = version.join('+');

  fs.writeFile('package.json', JSON.stringify(content, null, 2), function(err) {
		if(err) throw err;
		console.log("Current version: " + content.version);
	})
});
