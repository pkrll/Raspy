const FileSync = require('lowdb/adapters/FileSync');
const logfile  = 'logs/raspy.log';

module.exports = {

  write: function (type, message) {
    let defaults    = {};
    defaults[type]  = [];
    let data = { date: new Date().toLocaleString(), message: message };
    let stream = require('lowdb')(new FileSync(logfile));
    stream.defaults(defaults).write();
    stream.get(type).push(data).write();
  },

  read: function (type) {
    let defaults    = {};
    defaults[type]  = [];
    let stream = require('lowdb')(new FileSync(logfile));
    stream.defaults(defaults).write();

    return stream.get(type).value();
  }
};
