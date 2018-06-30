#!/usr/bin/env node
const express = require('express');
const https		= require('https');
const parser  = require('body-parser');
const app     = express();

// CONFIGURATIONS
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

require('./helpers/config.js')(app, __dirname);
require('./application/router')(app);

app.listen(app.get('port'));

console.log('Server mode: ' + (process.env.NODE_ENV || 'development'));

if (app.get('httpsOptions')) {
	console.log('Secure server started on ' + app.get('httpsPort'));
	https.createServer(app.get('httpsOptions'), app).listen(app.get('httpsPort'));
} else {
	console.log('Server started on ' + app.get('port'));
}
