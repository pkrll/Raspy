#!/usr/bin/env node
'use strict';

const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const socket  = require('socket.io')(server);
const updater = require('./lib/updater.js');
const path    = require('path');
const port    = '5001';

require('./src/router')(app);

socket.on('connection', function (socket) {

  socket.on('raspy/update', function (data) {
    updater.do('update', function (data) {
      socket.emit('updater/log', data);
    });
  });

  socket.on('raspy/restart', function (data) {
    updater.do('restart', function (data) {
      socket.emit('updater/log', data)
    });
  });

  socket.on('raspy/stop', function (data) {
    updater.do('stop', function (data) {
      socket.emit('updater/log', data)
    });
  });

  socket.on('updater/shutdown', function (data) {
    process.exit(0);
  });

});

app.use(express.static(path.join(__dirname, 'src/public/')));
server.listen(port, () => console.log('Listening on port ' + port));
