#!/usr/bin/env node
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const path        = require('path');
const config      = require('./config');
// CONFIGURATIONS
require('./src/config')(app, config, 5000, path.dirname(__dirname));
// ROUTES
require('./src/router')(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(app.get('port'));
console.log('Server started on ' + app.get('port'));
