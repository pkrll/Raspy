#!/usr/bin/env node
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const path        = require('path');

// CONFIGURATIONS
require('./src/config')(app, 5000, path.dirname(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
require('./src/router')(app);

app.listen(app.get('port'));
console.log('Server started on ' + app.get('port'));
