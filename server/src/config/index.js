'use strict';
const express = require('express');
const path    = require('path');

module.exports = function(app, defaultPort, rootFolder) {
  app.set('port', process.env.PORT || defaultPort);
  app.set('dist', path.join(rootFolder, 'dist'));
};
