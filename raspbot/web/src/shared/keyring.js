
export default {

  install: (Vue, cookieManager) => {
    Vue.prototype.$keyring = {

      cookie: cookieManager,
      credentials: { username: null, password: null },

      save: function(username, password, expires = null) {
        this.credentials.username = username;
        this.credentials.password = password;

        this.setExpiration(expires);
      },

      load: function() {
        this.credentials.username = this.cookie.get('username');
        this.credentials.password = this.cookie.get('password');

        if (this.credentials.username != null) return {
          username: this.credentials.username,
          password: this.credentials.password
        };

        return false;
      },

      setExpiration: function(autoLogin) {
        if (autoLogin == null) {
          autoLogin = this.cookie.get('autoLogin');
        }

        let expires = (autoLogin == 'true') ? {expires : '1Y'} : '0';

        this.cookie.set('username', this.credentials.username, expires);
        this.cookie.set('password', this.credentials.password, expires);
      }


    }
  }

}
