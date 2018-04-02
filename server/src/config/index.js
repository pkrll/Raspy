'use strict';
const express = require('express');
const path    = require('path');
const cors    = require('cors');

module.exports = function(app, defaultPort, rootFolder) {
  app.set('port', process.env.PORT || defaultPort);
  app.set('dist', path.join(rootFolder, 'dist'));

  if (process.env.NODE_ENV != 'production') {
    console.log("Enabling all CORS requests");
    app.use(cors());
  }
};
