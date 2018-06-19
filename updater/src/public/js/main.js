'use strict'
const socket = io();

socket.on('updater/log/dump', function (data) {
  for (let log of data.data) {
    write(log.message);
  }
});

socket.on('updater/log', function (data) {
  write(data.data);
  toggleCursor();
})

function call(endpoint) {
  toggleMenu();
  toggleCursor();
  write("$ " + endpoint);
  socket.emit('raspy/' + endpoint, null)
}

function shutdown() {
  socket.emit('updater/shutdown', null);
}

function write(data) {
  let output = document.getElementById("output");
  let cursor = document.getElementById("cursor");
  let newElm = document.createElement("pre");

  newElm.innerHTML = data;
  output.insertBefore(newElm, cursor);

  output.scrollTop = output.scrollHeight;
}

function toggleMenu() {
  let menu = document.getElementById("menu");
  if (menu.style.top == "0%" || menu.style.top == '') {
    menu.style.top = "100%";
    window.location.hash = "console";
  } else {
    menu.style.top = "0%";
    window.location.hash = "";
  }
}

function toggleCursor() {
  let cursor = document.getElementById("cursor");
  if (cursor.style.display == 'default' || cursor.style.display == '') {
    cursor.style.display = 'none';
  } else {
    cursor.style.display = 'default';
  }
}

function clearConsole() {
  toggleCursor();
  document.getElementById("output").innerHTML = "";
}

window.onload = function () {
  if (window.performance && performance.navigation.type == 1) {
    if (window.location.hash == "#console") {
      toggleMenu();
    }
  }
}
