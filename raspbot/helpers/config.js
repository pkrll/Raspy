'use strict';
const express = require('express');
const path    = require('path');
const fs			= require('fs');
const config	= require('../config');

module.exports = function (app, _path) {
	const productionMode = (process.env.NODE_ENV == 'production');
	const configurations = (productionMode) ? config.production : config.development;
	const databasePath 	 = path.join(_path, configurations.databasePath);

	const certPath 	= path.join(_path, configurations.httpsOpts.cert);
	const keyPath 	= path.join(_path, configurations.httpsOpts.key);

	if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
		app.set('httpsOptions', configurations.httpsOpts);
	} else {
		app.set('httpsOptions', {});
	}

	app.set('databasePath', databasePath);
	app.set('port', process.env.PORT || configurations.port);
	app.set('httpsPort', process.env.HTTPSPORT || configurations.httpsPort);
  app.set('dist', path.join(_path, 'dist'));

	if (productionMode == false) {
		const cors = require('cors');
		console.log("Enabling all CORS requests");
    app.use(cors());
	}
}
