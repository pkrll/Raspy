'use strict';
const express = require('express');
const path    = require('path');
const cors    = require('cors');

module.exports = function(app, config, rootFolder) {
  const productionMode  = (process.env.NODE_ENV == 'production');
  const defaultPort     = (productionMode) ? config.prod.port : config.dev.port;

  if (!productionMode) {
    console.log("Enabling all CORS requests");
    app.use(cors());
    app.set('databasePath', config.dev.databasePath);
  } else {
    app.set('databasePath', config.prod.databasePath);
  }

  app.set('port', process.env.PORT || defaultPort);
  app.set('dist', path.join(rootFolder, 'dist'));
};
