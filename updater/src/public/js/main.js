'use strict'
const socket = io();

socket.on('raspy/update',   function (data) { write(data.data); });
socket.on('raspy/restart',  function (data) { write(data.data); });
socket.on('raspy/stop',     function (data) { write(data.data); });

function update() {
  write("$ update");
  socket.emit('raspy/update', null);
}

function restart() {
  write("$ restart");
  socket.emit('raspy/restart', null);
}

function stop() {
  write("$ stop");
  socket.emit('raspy/stop', null);
}

function write(data) {
  document.getElementById("console").innerHTML += "<pre>"+data+"</pre>";
}
