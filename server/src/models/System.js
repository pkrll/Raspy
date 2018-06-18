
module.exports = {
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
  checkForUpdate: function () {
    return new Promise(
      (resolve, reject) => {
        const remote = require('remote-json');
        remote.https = require('follow-redirects').https;
        remote('https://api.github.com/repos/pkrll/Raspy/releases', {
          headers: {
            'User-Agent': 'Raspy'
          }
        }).get(function (err, res, body) {
          if (err) {
            reject(err);
          } else {
            if (res.statusCode == 200 && body.length > 0) {
              const fs = require('fs');
              fs.readFile('../package.json', function(err, data) {
                if (err) {
                  reject(err);
                } else {
                  let content = JSON.parse(data);
                  let version = content.version.split('+')[0];
                  let compare = require('compare-versions');
                  let response = {
                    heading: '',
                    version: version,
                    isNewer: false,
                    changes: ''
                  }
                  const tag = body[0]['tag_name'];

                  if (compare(tag, version) > 0) {
                    response.version = tag;
                    response.isNewer = true;
                    response.changes = body[0]['body'];
                    response.heading = body[0]['name'];
                  }

                  resolve(response);
                }
              });
            } else {
              reject(null);
            }
          }
        });
      });
  }
};
