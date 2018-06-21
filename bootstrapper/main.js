#!/usr/bin/env node
'use strict';

const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const path    = require('path');

// require('./helpers/config.js')(app);
app.set('port', process.env.PORT || 5001);
app.set('dist', path.join(__dirname, 'dist'));
require('./app/router')(app);

server.listen(app.get('port'), () => console.log('Listening on port ' + app.get('port')));
