// BrowserController.js
const path = require('path');
const browser = require('../models/Browser');

exports.browse = function (req, res) {
  let request = '/';

  if (req.params.path != undefined) {
    request = path.join(request, req.params.path, req.params[0]);
  }

  browser.getDirectory(request).then(response => {
    res.json(response);
  }).catch(error => {
    res.status(500).json(error)
  });
};

exports.getFile = function (req, res) {
  let request = path.join('/', req.params.path, req.params[0]);
  browser.getFile(request).then(response => {
    res.json(response);
  }).catch(error => {
    res.status(500).json(error);
  });
};

exports.remove = function (req, res) {
  let request = path.join('/', req.params.path, req.params[0]);
  browser.remove(request).then(response => {
    res.json(response);
  }).catch(error => {
    res.status(500).json(error);
  });
};

exports.download = function (req, res) {
  let request = path.join('/', req.params.path, req.params[0]);
  res.download(request, path.basename(request), (error) => {
    if (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json(error);
      } else {
        res.status(500).json(error);
      }
      console.log('Error: BrowserControllerdownload():');
      console.log(error);
    }
  });
};

exports.create = function (req, res) {
  let fullPath = req.body.fullPath;
  browser.create(fullPath, function (err, response) {
    if (err) {
      res.json({status: 0, message: err});
    } else {
      res.json(response)
    }
  })
}
