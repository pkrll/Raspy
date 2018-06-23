'use strict';
const express = require('express');
const path    = require('path');
const config	= require('../config/')
const winston = require('winston');

module.exports = function(app) {
  const isDebugMode  = (process.env.NODE_ENV != 'production');
  const defaultPort  = (isDebugMode) ? config.dev.port : config.port.port;
  const databasePath = (isDebugMode) ? config.dev.databasePath : config.port.databasePath;

  app.set('databasePath', databasePath);
  app.set('port', process.env.PORT || defaultPort);
  app.set('dist', path.join(__dirname, '../dist'));

  winston.loggers.add('command-logger', {
     console: {
       level: 'info',
       colorize: true,
       label: 'Command history'
     },
     file: { filename: 'tmp/commands.log' }
  });

  winston.loggers.add('logger', {
     console: {
       level: 'info',
       colorize: true,
       label: 'Logger'
     },
     file: { filename: 'tmp/info.log' }
  });
};
