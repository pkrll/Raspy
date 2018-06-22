'use strict'
const winston = require('winston').loggers.get('command-logger');
const System = require('../controllers/SystemController.js');
const Raspy = require('../controllers/RaspyController.js');

module.exports = socket => {

  socket.on('client:status', () => {
    System.isNodeAppRunning('server.js', response => {
      socket.emit('status', response);
    });
  });

  socket.on('client:perform', request => {
    winston.log('info', '$ ' + request.command);

    switch (request.command) {
      case 'update':
        Raspy.update(message => socket.emit('command', message));
        break;
      case 'install':
        Raspy.install(message => socket.emit('command', message));
        break;
      case 'restart':
        Raspy.restart(message => socket.emit('command', message));
        break;
      case 'stop':
        Raspy.stop(message => socket.emit('command', message));
        break;
      default:
        socket.emit('command', {
          status: 0,
          error: { message: 'Unrecognized command ' + request.command }
        });
        break;
    }
  });

  socket.on('client:history', () => {
    const options = {
      from: new Date - 24 * 60 * 60 * 1000 * 7,
      until: new Date,
      limit: 20,
      start: 0,
      order: 'asc',
      fields: ['message', 'level']
    };

    System.getLogHistory(options, response => socket.emit('history', response));
  });

};
