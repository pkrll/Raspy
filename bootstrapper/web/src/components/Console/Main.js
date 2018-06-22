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
