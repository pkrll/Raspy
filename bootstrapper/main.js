#!/usr/bin/env node
'use strict';

const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const socket  = require('socket.io')(server);
const path    = require('path');
const sioAuth = require("socketio-auth");

require('./helpers/config.js')(app);
require('./app/router')(app);


const authenticate = async (socket, data, callback) => {
  //get credentials sent by the client
  console.log(data);
  var username = data.username;
  var password = data.password;
  var check = (username == 'admin' && password == 'secret');

  return callback(null, check);
}

const postAuthenticate = socket => {

  socket.on('client:perform', request => {
    console.log(request);
  });

};

sioAuth(socket, { authenticate, postAuthenticate, timeout: "none" });


server.listen(app.get('port'), () => console.log('Listening on port ' + app.get('port')));
