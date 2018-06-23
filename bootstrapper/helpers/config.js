'use strict';
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const config	= require('../config/')
const winston = require('winston');

module.exports = function(app) {
  const isDebugMode  = (process.env.NODE_ENV != 'production');
  const defaultPort  = (isDebugMode) ? config.dev.port : config.prod.port;
  const databasePath = (isDebugMode) ? config.dev.databasePath : config.prod.databasePath;

  app.set('databasePath', databasePath);
  app.set('port', process.env.PORT || defaultPort);
  app.set('dist', path.join(__dirname, '../dist'));

  let logPath = path.join(__dirname, '/../'+config.logPath);
  if (fs.existsSync(logPath) == false) { fs.mkdirSync(logPath); }

  winston.loggers.add('command-logger', {
     console: {
       level: 'info',
       colorize: true,
       label: 'Command history'
     },
     file: { filename: logPath + '/commands.log' }
  });

  winston.loggers.add('logger', {
     console: {
       level: 'info',
       colorize: true,
       label: 'Logger'
     },
     file: { filename: logPath + '/info.log' }
  });
};
