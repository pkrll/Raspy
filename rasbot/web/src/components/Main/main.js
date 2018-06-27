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

exports.mounted = function() {
  if (this.$root.isLoggedIn) {
    this.toggleView('Splash', '', false);
  } else {
    this.delayExecution(() => this.toggleView('Login'), 1000);
  }
}

exports.methods = {

  delayExecution: function(func, delay = 1000) {
    let timer = setInterval(() => {
      func();
      clearInterval(timer);
    }, delay);
  },

  toggleView: function(component = '', textElement = '', animation = true) {
    this.component   = component;
    this.textElement = textElement;
    this.animation   = animation;
  },

  signIn: function(username, password) {
    this.textElement = "Signing in...";
    this.$APIManager.authenticate(username, password, response => {
      if (response.success) {
        this.$root.didAuthenticate(response.result.token);
        this.toggleView('Splash', '0.3.0', false);
      } else {
        this.textElement = response.error.message;
      }
    });
  }
}
