#!/usr/bin/env node
'use strict';

const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const socket  = require('socket.io')(server);
const updater = require('./lib/updater.js');
const path    = require('path');
const logger  = require('./lib/logger.js')('logs/log.log');
const port    = '5001';

require('./src/router')(app);

function performCommand(command, socket) {
  logger.write("$ " + command);
  updater.do(command, function (data) {
    logger.write(data.data);
    socket.emit('updater/log', data);
  });
}

socket.on('connection', function (socket) {

  logger.read(function (content) {
    socket.emit('updater/log/dump', { data: content });
  });

  socket.on('raspy/update', function (data) {
    performCommand('update', socket);
  });

  socket.on('raspy/restart', function (data) {
    performCommand('restart', socket);
  });

  socket.on('raspy/stop', function (data) {
    performCommand('stop', socket);
  });

  socket.on('updater/shutdown', function (data) {
    performCommand('shutdown', socket);
  });

});

app.use(express.static(path.join(__dirname, 'src/public/')));
server.listen(port, () => console.log('Listening on port ' + port));
