'use strict'
const socketioAuth = require("socketio-auth");
const socketEvents = require('../app/router/socket.js');

const authenticate = async (socket, data, callback) => {
  var username = data.username;
  var password = data.password;
  var check = (username == 'admin' && password == 'secret');

  console.log("Authentication attempt: " + ((check) ? 'success' : 'failure'));

  return callback(null, check);
}

const disconnected = socket => {
  console.log("Socket with id " + socket.id + " disconnected.");
}

module.exports = function (server) {
	const socketio = require('socket.io')(server);
	socketioAuth(socketio, {
    authenticate: authenticate,
    disconnect: disconnected,
    postAuthenticate: socketEvents,
    timeout: "none"
  });
}
