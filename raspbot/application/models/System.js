const oauth = require('../../config/index.js').oauth;

exports.checkForUpdate = () => {
	return new Promise((resolve, reject) => {
		getLatestRelease(json => {
			const fs = require('fs');
			fs.readFile('package.json', function(err, data) {
				if (err) {
					reject(err);
				} else {
					const content = JSON.parse(data);
					const version = content.version;
					const compare = require('compare-versions');
					let response = { heading: '', version: version, isNewer: false, changes: '' }

					if (compare(json.version, version) > 0) {
						response.version = json.version;
						response.isNewer = true;
						response.changes = json.changes;
						response.heading = json.heading;
					}

					resolve(response);
				}
			});
		}, reject);
	});
};

exports.launchBootstrapper = () => {
	return executeCommand('cd ../ && make start_bootstrapper');
};

function getLatestRelease(callback, reject) {
	let url = 'https://api.github.com/repos/pkrll/Raspy/releases';
	if (oauth.id && oauth.secret) {
		url += '?client_id=' + oauth.id + '&client_secret=' + oauth.secret;
	}

	const remote = require('remote-json');
	remote.https = require('follow-redirects').https;
	remote(url, {
		headers: { 'User-Agent': 'Raspy' }
	}).get(function (error, res, body) {
		if (error) {
			reject(error);
		} else {
			if (res.statusCode == 200 && body.length > 0) {
				let response = {
					version: body[0]['tag_name'],
					changes: body[0]['body'],
					heading: body[0]['name']
				}

				callback(response);
			} else {
				reject({ error: { message: "An error occured: " + res.statusCode }});
			}
		}
	});
}

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
