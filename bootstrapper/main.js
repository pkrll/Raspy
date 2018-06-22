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

	socket.on('client:login', request => {
		let response = {
			status: 0,
			params: request.params,
			message: ''
		};

		if (request.params.username == 'admin' && request.params.password == 'secret') {
			response.status = 1;
		} else {
			response.status = 0;
			response.message = "Wrong username or password";
		}

		socket.emit('login', response);
	});

	socket.on('client:update', request => {
		if (!socket.handshake.query.token) {
			socket.emit('authentication:required', { message: "Authentication required" });
		}
	});

});

server.listen(app.get('port'), () => console.log('Listening on port ' + app.get('port')));
