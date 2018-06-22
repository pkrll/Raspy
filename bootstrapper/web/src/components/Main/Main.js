'use strict'

exports.data = function () {
  return {
    message: 'Initializing...',
    component: 'Splash'
  }
}

exports.computed = {
  onLogin: function () {
    return (this.component == 'Login')
  },
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
      this.$root._router.push('/console');
    } else {
      this.message = message;
    }
  }
}

exports.mounted = function () {
  let timer = setInterval( () => {
    clearInterval(timer);
    if (this.$root.isLoggedIn == false) {
      this.component = 'Login'
      this.message = ''
    } else {
      this.$root._router.push('/console');
    }
  }, 1000);
}
