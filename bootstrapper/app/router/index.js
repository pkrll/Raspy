'use strict'
const express = require('express');
const router  = express.Router();
const path    = require('path');

module.exports = function (app) {

  app.use(express.static(app.get('dist')));

  app.get('*', function(req, res) {
    let file = path.join(app.get('dist'), '/index.html');
    res.sendFile(file);
  });

}
