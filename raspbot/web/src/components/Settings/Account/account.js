'use strict'

exports.data = function() {
  return {
    autoLogin: false
  }
}

exports.created = function () {
  let autoLogin = this.$cookie.get('autoLogin');
  this.autoLogin = (autoLogin != undefined && autoLogin == 'true') ? true : false;
}

exports.methods = {
  /**
   * Signs out of Raspy.
   */
  signOut: function () {
    this.$root.deleteSession();
    this.$root._router.push('/');
  },
  /**
   * Toggles the auto login options.
   */
  toggleAutoLogin: function () {
    this.autoLogin = !this.autoLogin;
    this.$cookie.set('autoLogin', this.autoLogin, { expires: '1Y' });
    this.$keyring.setExpiration(this.autoLogin);
  }
};

exports.filters = {
  /**
   * Replaces true with on and false with off.
   *
   * @param  {Boolean} value 	The boolean value to replace.
   * @return {String}       	'On' if value is true, otherwise 'off'.
   */
  autoLoginFilter: function (value) {
    return (value == true) ? 'On' : 'Off';
  }
};
