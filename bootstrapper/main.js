#!/usr/bin/env node
'use strict';

const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const socket  = require('socket.io')(server);
const path    = require('path');

require('./helpers/config.js')(app);
require('./app/router')(app);

socket.on('connection', socket => {

	if (!socket.handshake.query.token) {
		socket.emit('authentication:required', { message: "YO" });
	}
});

server.listen(app.get('port'), () => console.log('Listening on port ' + app.get('port')));
