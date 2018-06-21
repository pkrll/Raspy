const fs = require('fs');
const pt = require('path');
module.exports = {

  getDirectory: function (path) {
    return new Promise(
      (resolve, reject) => {
        try {
          let result = { directories: [], files: [] };
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

          resolve({status: 1, result: result});
        } catch (error) {
          console.log('ERROR: Browser.getDirectory() (line 37) > ' + error);
          reject({status: 0, error: error, result: {}});
        }
      }
    );
  },

  getFile: function (path) {
    return new Promise(
      (resolve, reject) => {
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

          resolve({status: 1, result: result});
        } catch (error) {
          console.log('ERROR: Browser.getFile() (line 58) > ' + error);
          reject({status: 0, error: error, result: result});
        }
      }
    );
  },

  remove: function (path) {
    return new Promise(
      (resolve, reject) => {
        try {
          let stats = fs.statSync(path);

          if (stats.isDirectory()) {
            const rimraf = require('rimraf');

            rimraf(path, (error) => {
              if (error) {
                reject({status: 0, error: error});
              } else {
                resolve({status: 1});
              }
            });
          } else {
            fs.unlink(path, (error) => {
              if (error) {
                reject({status: 0, error: error});
              } else {
                resolve({status: 1});
              }
            });
          }
        } catch (error) {
          console.log('ERROR: Browser.remove() > ');
          console.log(error);
          reject({status: 0, error: error});
        }
      }
    );
  },

  create: function (path, callback) {
    try {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
        callback(null, {status: 1, path: path})
      } else {
        callback("File already exists", path)
      }
    } catch (err) {
      console.log('ERROR: Browser.create() > ' + err);
    }
  }
}
