'use strict';
const express = require('express');
const path    = require('path');
const cors    = require('cors');
const config	= require('../config');

module.exports = function (app, _path) {
	const productionMode = (process.env.NODE_ENV == 'production');
	const configurations = (productionMode) ? config.production : config.development;
	const databasePath 	 = path.join(_path, configurations.databasePath);

	app.set('databasePath', databasePath);
	app.set('port', process.env.PORT || configurations.port);
  app.set('dist', path.join(_path, 'dist'));

	if (productionMode == false) {
		console.log("Enabling all CORS requests");
    app.use(cors());
	}
}
