'use strict'

exports.data = function() {
  return {
    commandInprogress: false,
    overlayComponent: 'Console',
    menuHidden: true,
    logs: []
  }
}

exports.methods = {
  /**
   * Requests the server to perform the specified command.
   *
   * The response can be caught by listening on 'command'.
   *
   * @param  String command The command to perform.
   */
  performCommand: function (command) {
    this.$socket.emit('client:perform', { command: command });
    this.logs.push("$ " + command);
    this.showConsole(true);
    this.commandInprogress = true;
  },
  /**
   * Toggles the console.
   *
   * @param  Boolean value 	True to show the console, otherwise false.
   */
  showConsole: function (value) {
    this.overlayComponent = (value) ? 'Console' : 'Menu';
    this.menuHidden = value;
  },
  /**
   * Clears the console.
   */
  clearConsole: function () {
    this.logs = [];
  },
}

exports.created = function() {
  this.$socket.on('command', response => {
    this.commandInprogress = false;
    if (response.status == 1) {
      this.logs.push(response.result);
    } else {
      this.logs.push(response.error.message);
    }
  });

  this.$socket.on('history', response => {
    if (response.status == 1) {
      response.result.forEach(item => {
  			this.logs.push(item.message);
  		});
    }
  });

  this.$socket.emit('client:history', null);
}
