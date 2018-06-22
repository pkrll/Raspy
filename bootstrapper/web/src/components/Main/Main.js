'use strict'

exports.data = function () {
  return {
    message: 'Initializing...',
    component: 'Splash'
  }
}

exports.computed = {
  /**
   * Determines if the current view is on login or not.
   *
   * This function is used to make sure the design is responsive.
   *
   * @return  Boolean  True if the view is Login.
   */
  onLogin: function () {
    return (this.component == 'Login')
  },
  /**
   * Determines if the current view is empty.
   *
   * This function is used to make sure the design is responsive.
   *
   * @return  Boolean  True if the view is Login.
   */
  onEmpty: function () {
    return (this.component == '')
  }
}

exports.methods = {
  /**
   * Invoked by the Login component on an authentication attempt.
   *
   * This function is responsible for changing router view to
   * /console, if the login was successful.
   *
   * @param  Boolean  didSucced   True if the login was successful,
   *                              otherwise false.
   * @param  String   message     The error message on failure.
   */
  handleAuthResponse: function (didSucceed, message) {
    if (didSucceed) {
      this.requestStatusCheck();
    } else {
      this.message = message;
    }
  },
  /**
   * Requests a status check from the server. Invoked after the user
   * has been authenticated.
   *
   * The Vue root instance is responsible for handling the response.
   */
  requestStatusCheck: function () {
    this.$socket.emit('client:status', null);
  }
}

exports.mounted = function () {
  let timer = setInterval( () => {
    clearInterval(timer);
    if (this.$root.isLoggedIn == false) {
      this.component = 'Login'
      this.message = ''
    } else {
      this.requestStatusCheck();
    }
  }, 1000);
}
