const oauth = require('../../config/index.js').oauth;
module.exports = {
  /**
   * Retrieves system information.
   */
  index: function () {
    return new Promise(
      (resolve, reject) => {
        const PythonShell = require('python-shell');

        const options = {
          mode: 'json',
          args: [],
          scriptPath: './lib'
        };

        PythonShell.run('sysinfo.py', options, function (err, response) {
          if (err) {
            reject({status: 0, error: err});
          } else {
            resolve({status: 1, result: response[0]});
          }
        });
      }
    );
  },
  /**
   * Checks for a system update.
   */
  checkForUpdate: function () {
    return new Promise(
      (resolve, reject) => {
        getLatestRelease(function (json) {
          const fs = require('fs');
          fs.readFile('../package.json', function(err, data) {
            if (err) {
              reject({status: 0, error: err});
            } else {
              let content = JSON.parse(data);
              let version = content.version.split('+')[0];
              let compare = require('compare-versions');
              let response = { heading: '', version: version, isNewer: false, changes: '' }

              if (compare(json.version, version) == -1) {
                response.version = json.version;
                response.isNewer = true;
                response.changes = json.changes;
                response.heading = json.heading;
              }

              resolve({status: 1, result: response});
            }
          });
        }, reject);
      }
    );
  },

  launchBootstrapper: function () {
    return executeCommand('cd ../ && make start_updater');
  }

};

function getLatestRelease(callback, reject) {
  if (oauth.id == 'changeme' || oauth.secret == 'changeme') {
    reject({status: 0, error: { message: "The application is not authorized to access Github. Check the documentation on how to fix this." }});
  }

  let url = 'https://api.github.com/repos/pkrll/Raspy/releases';
  url += '?client_id=' + oauth.id + '&client_secret=' + oauth.secret;
  const remote = require('remote-json');
  remote.https = require('follow-redirects').https;
  remote(url, {
    headers: { 'User-Agent': 'Raspy' }
  }).get(function (err, res, body) {
    if (err) {
      reject({status: 0, error: err});
    } else {
      if (res.statusCode == 200 && body.length > 0) {
        let response = {
          version: body[0]['tag_name'],
          changes: body[0]['body'],
          heading: body[0]['name']
        }

        callback(response);
      } else {
        reject({status: 0, error: { message: "An error occured: " + res.statusCode }});
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
