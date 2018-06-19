const fs = require('fs');

module.exports = function (logfile) {

  this.stream = fs.createWriteStream(logfile, { flags: 'a+' });

  if (fs.existsSync(logfile) == false) {
    let data = {
      date: new Date().toLocaleString(), message: "New logfile created."
    };

    this.stream.write(JSON.stringify(data));
  }

  this.write = function (message) {
    let data = { date: new Date().toLocaleString(), message: message };
    this.stream.write(','+JSON.stringify(data));
  };

  this.read = function (callback) {
    let rs = fs.createReadStream(logfile, { encoding: 'utf8' });
    let data = ""



    rs.on('data', function(chunk) {
      data += chunk;
    });

    rs.on('end', function() {
      let json = JSON.parse('['+data+']');
      callback(json);
    });
  };

  return this;
};
