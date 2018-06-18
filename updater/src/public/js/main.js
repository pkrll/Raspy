'use strict'
const socket = io();

socket.on('updater/log', function (data) { write(data.data); });

function call(endpoint) {
  write("$ " + endpoint);
  socket.emit('raspy/' + endpoint, null)
}

function write(data) {
  document.getElementById("console").innerHTML += "<pre>"+data+"</pre>";
}
