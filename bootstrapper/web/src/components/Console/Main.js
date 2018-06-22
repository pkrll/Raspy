'use strict'

exports.methods = {

  performCommand: function (command) {
    this.$socket.on('client:perform', { command: command });
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

  clearConsole: function () {

  },
}

exports.data = function() {
  return {
    commandInprogress: false,
    overlayComponent: 'Console',
    menuHidden: true,
    logs: []
  }
}
