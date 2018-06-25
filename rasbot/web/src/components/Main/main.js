'use strict'

exports.data = () => {
  return {
    component: 'Splash',
    textElement: 'Initializing'
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

exports.created = function() {

}

exports.mounted = function() {
  let timer = setInterval( () => {
    this.component = 'Login';
    this.textElement = '';
    clearInterval(timer);
  }, 1000);
}

exports.methods = {
  signIn: function(username, password) {
    this.$APIManager.authenticate(username, password, response => {
      if (response.success) {
        this.$root.setToken(response.result.token);
      }
    });
  }
}
