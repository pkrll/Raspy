// BrowserController.js
const path = require('path');
const browser = require('../models/Browser');

exports.browse = function (req, res) {
  let request = '/';

  if (req.params.path != undefined) {
    request = path.join(request, req.params.path, req.params[0]);
  }

  browser.getDirectory(request, (err, response)  => {
    response.status = (err == null) ? 1 : 0;
    response.error  = err;

    res.json(response);
  });
};

exports.getFile = function (req, res) {
  let request = path.join('/', req.params.path, req.params[0]);
  browser.getFile(request, function (err, response) {
    response.status = (err == null) ? 1 : 0;
    response.error  = err;

    res.json(response);
  });
};

exports.remove = function (req, res) {
  let request = path.join('/', req.params.path, req.params[0]);
  browser.remove(request, function (err, response) {
    if (err) {
      res.json({status: 0, message: err});
    } else {
      res.json(response);
    }
  });
};

exports.download = function (req, res) {
  let request = path.join('/', req.params.path, req.params[0]);
  res.download(request, path.basename(request), (err) => {
    if (err) console.log('Error: BrowserControllerdownload() > ' + err);
  });
};
