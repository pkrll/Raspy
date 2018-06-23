'use strict'

exports.data = function () {
  return {
    username: '',
    password: ''
  }
}

exports.methods = {
  /**
   * Invoked when the user presses the sign in button.
   *
   * This function sends an authentication request to
   * the server.
   */
  signIn: function () {
    this.$root.authenticate(this.username, this.password, (status, message) => {
      this.$emit('handleAuthResponse', status, message);
    });
  }
}

exports.mounted = function () {

}
