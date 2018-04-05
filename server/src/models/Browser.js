const fs = require('fs');
const pt = require('path');
module.exports = {

  getDirectory: function (path, callback) {
    let result = {
      directories: [],
      files: []
    };

    try {

      fs.readdirSync(path).forEach(file => {
        let fullPath = pt.join(path, file);

        try {
          let stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            result.directories.push({ name: file, path: fullPath });
          } else {
            result.files.push({ name: file, path: fullPath });
          }
        } catch (err) {
          console.log('ERROR: Browser.getDirectory (line 31) > ' + err);
          // temp fix for libuv bug
          result.files.push({ name: file, path: fullPath, error: err });
        }
      });

      callback(null, result);
    } catch (err) {
      console.log('ERROR: Browser.getDirectory() (line 37) > ' + err);
      callback(err, result);
    }
  },

  getFile: function (path, callback) {
    let result = {
      filename: pt.basename(path),
      metadata: {
        size: 0,
        accessed: 0,
        created: 0,
        modified: 0
      }
    };

    try {
      let stats = fs.statSync(path);
      result.metadata.size = stats.size;
      result.metadata.accessed = stats.atimeMs;
      result.metadata.created = stats.birthtimeMs;
      result.metadata.modified = stats.mtimeMs;

      callback(null, result);
    } catch (err) {
      console.log('ERROR: Browser.getFile() (line 58) > ' + err);
      callback(err, result);
    }
  },

  remove: function (path, callback) {
    try {
      let response = {status: 1};
      let stats = fs.statSync(path);

      if (stats.isDirectory()) {
        const rimraf = require('rimraf');

        rimraf(path, (err) => {
          if (err) {
            callback(err);
          } else {
            callback(null, response);
          }
        });
      } else {
        fs.unlink(path, (err) => {
          if (err) {
            callback(err);
          } else {
            callback(null, response);
          }
        });
      }
    } catch (err) {
      console.log('ERROR: Browser.remove() > ' + err);
      callback(err);
    }
  }
}
