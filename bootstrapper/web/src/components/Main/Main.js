'use strict'

exports.data = function () {
  return {
    message: 'Initializing...',
    component: Splash
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

  handleLoginResponse: function (response) {
    if (response.status == 1) {
      let username = response.username;
      let password = response.password;

      this.$cookie.set('username', username, { expires: '1Y' });
      this.$cookie.set('password', password, { expires: '1Y' });
      this.$root.setSession(username, password);
      this.$root._router.push('/console');
    } else {
      this.message = response.message;
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
