#!/usr/bin/env node
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const path        = require('path');
const config      = require('./config');

// CONFIGURATIONS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./src/config')(app, config, path.dirname(__dirname));

// ROUTES
require('./src/router')(app);

app.listen(app.get('port'));
console.log('Server started on ' + app.get('port'));
