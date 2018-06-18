'use strict'
const socket = io();

socket.on('updater/update', function (data) {
  document.getElementById("console").innerHTML += "<pre>"+data.data+"</pre>";
});

function update() {
  document.getElementById("console").innerHTML += "<pre>$ update</pre>";
  socket.emit('updater/update', null);
}
