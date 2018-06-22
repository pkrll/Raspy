'use strict'

module.exports = socket => {

  socket.on('client:perform', request => {
    console.log(request);
  });

};
