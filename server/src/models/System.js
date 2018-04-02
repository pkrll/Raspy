
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
  }
};
