#!/usr/bin/env node
'use strict';

const express = require('express');
const app     = express();
const server  = require('http').Server(app);

require('./helpers/config.js')(app);
require('./helpers/socket.js')(server);
require('./app/router')(app);

server.listen(app.get('port'), () => console.log('Listening on port ' + app.get('port')));
