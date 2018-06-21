'use strict'
const express = require('express');
const router  = express.Router();
const path    = require('path');

module.exports = function (app) {

  router.get('/', function (req, res) {
    res.json({
      message: 'Raspy Bootstrapper'
    })
  });


  app.use(express.static(app.get('dist')));
  app.use('/api', router);
  // Catch all to handle direct routes
  app.get('*', function(req, res) {
    let file = path.join(app.get('dist'), '/index.html');
    res.sendFile(file);
  });
}
