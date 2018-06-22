'use strict'

exports.methods = {
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

  }
}
