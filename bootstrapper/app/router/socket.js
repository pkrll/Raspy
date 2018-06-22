'use strict'
const System = require('../controllers/SystemController.js');

module.exports = socket => {

  socket.on('client:status', () => {
    System.isNodeAppRunning('server.js', response => {
      socket.emit('status', response);
    });
  });

  socket.on('client:perform', request => {
    console.log(request);
  });

};
