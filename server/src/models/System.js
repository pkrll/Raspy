
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
            reject(err);
          } else {
            resolve(response[0]);
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
              reject(err);
            } else {
              let content = JSON.parse(data);
              let version = content.version.split('+')[0];
              let compare = require('compare-versions');
              let response = { heading: '', version: version, isNewer: false, changes: '' }

              if (compare(json.version, version) == 0) {
                response.version = json.version;
                response.isNewer = true;
                response.changes = json.changes;
                response.heading = json.heading;
              }

              resolve(response);
            }
          });
        }, function (err) {
          reject(err);
        });
      }
    );
  },

  launchUpdater: function () {
    return new Promise(
      (resolve, reject) => {
        const { exec } = require('child_process');
        exec('cd ../ && make updater', (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            resolve({status: 1, data: stdout});
          }
        });
      }
    );
  }

};

function getLatestRelease(callback, errback) {
  const remote = require('remote-json');
  remote.https = require('follow-redirects').https;
  remote('https://api.github.com/repos/pkrll/Raspy/releases', {
    headers: {
      'User-Agent': 'Raspy'
    }
  }).get(function (err, res, body) {
    if (err) {
      errback(err);
    } else {
      if (res.statusCode == 200 && body.length > 0) {
        let response = {
          version: body[0]['tag_name'],
          changes: body[0]['body'],
          heading: body[0]['name']
        }

        callback(response);
      } else {
        errback(null);
      }
    }
  });
}
