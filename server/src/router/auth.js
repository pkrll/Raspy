const fs        = require('fs');
const basicAuth = require('basic-auth');
const FileSync  = require('lowdb/adapters/FileSync');

module.exports = function (filePath) {
  const adapter = new FileSync(filePath);
  const database = require('lowdb')(adapter);

  return function (req, res, next) {

    function unauthorized(res) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    };

    const user = basicAuth(req);

    if (!user || !user.name || !user.pass) return unauthorized(res);

    const credentials = database.get('users').find({ username: user.name }).value();

    if (credentials != undefined && credentials.password === user.pass) {
      return next();
    } else {
      return unauthorized(res);
    }

  };

};
