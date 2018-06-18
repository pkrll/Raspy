
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
        remote('https://api.github.com/repos/pkrll/raspy/tags', {
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
                  let response = { version: version, isNewer: false }
                  const tag = body[0]['name'];

                  if (compare(tag, version) > 0) {
                    response.version = tag;
                    response.isNewer = true;
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
