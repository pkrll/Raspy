#!/usr/bin/env node
const express = require('express');
const parser  = require('body-parser');
const app     = express();

// CONFIGURATIONS
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

require('./helpers/config.js')(app, __dirname);
require('./application/router')(app);

app.listen(app.get('port'));

console.log('Server mode: ' + (process.env.NODE_ENV || 'development'));
console.log('Server started on ' + app.get('port'));
