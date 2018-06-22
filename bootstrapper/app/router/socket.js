'use strict'
const System = require('../controllers/SystemController.js');
const Raspy = require('../controllers/RaspyController.js');

module.exports = socket => {

  socket.on('client:status', () => {
    System.isNodeAppRunning('server.js', response => {
      socket.emit('status', response);
    });
  });

  socket.on('client:perform', request => {
    switch (request.command) {
      case 'update':
        Raspy.update(message => socket.emit('command', message));
        break;
      default:
        socket.emit('command', {
          status: 0,
          error: new Error('Unrecognized command ' + request.command)
        });
        break;
    }
  });

};
