const fs = require('fs');
const pt = require('path');
module.exports = {

  getFolder: function (path, callback) {
    try {
      let result = {
        directories: [],
        files: []
      };

      fs.readdirSync(path).forEach(file => {
        let fullPath = pt.join(path, file);
        let stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          result.directories.push({
            name: file,
            path: fullPath
          });
        } else {
          result.files.push({
            name: file,
            path: fullPath
          });
        }
      });

      callback(null, result);
    } catch (err) {
      console.log(err);
      callback(err);
    }
  }
}
