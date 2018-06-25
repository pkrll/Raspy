'use strict'

exports.data = () => {
  return {
    component: 'Splash',
    textElement: 'Initializing',
    animation: true
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
  }
}

exports.created = function() {

}

exports.mounted = function() {
  this.delayExecution(() => this.toggleView(), 1000);
}

exports.methods = {

  test: function() {
    this.$root.isLoggedIn = true
  },

  delayExecution: function(func, delay = 1000) {
    let timer = setInterval(() => {
      func();
      clearInterval(timer);
    }, delay);
  },

  toggleView: function(textElement = '') {
    this.component   = (this.onLogin) ? 'Splash' : 'Login';
    this.textElement = textElement;
  },

  signIn: function(username, password) {
    this.textElement = "Signing in...";
    this.$APIManager.authenticate(username, password, response => {
      if (response.success) {
        this.$root.didAuthenticate(response.result.token);
        this.stopAnimation();
        this.toggleView('0.3.0');
      } else {
        this.textElement = response.error.message;
      }
    });
  },

  stopAnimation: function() {
    this.animation = false;
  }
}
