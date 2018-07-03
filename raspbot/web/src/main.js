// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueCookie from 'vue-cookie';
import shared from '@/shared/index.js';
import APIManager from '@/shared/apimanager.js';
import Keyring from '@/shared/keyring.js';
import Application from '@/shared/application.js';
import DateFormatter from '@/shared/dateformatter.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;

Vue.use(shared);
Vue.use(VueCookie);
Vue.use(Keyring, VueCookie);
Vue.use(Application);
Vue.use(DateFormatter);
Vue.use(APIManager, process.env.API_URL, 60000);
Vue.component('font-awesome-icon', FontAwesomeIcon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: function () {
    return {
      loggedIn: false,
      lastPath: null,
      initializing: true,
      debugMode: (process.env.NODE_ENV != 'production')
    }
  },
  methods: {
    /**
     *  Invoked when receiving a 401 unauthorized response.
     */
    didReceiveAuthenticationError: function() {
      if (this._route.name != 'Main') {
        this.lastPath = this._route.path;
        this.loggedIn = false;
        this._router.push('/');
      }
    },
    /**
     *  Invoked when user has authenticated and received a token.
     *
     *  @param  {Strin} token  The session token.
     */
    didAuthenticate: function(token) {
      this.$APIManager.setToken(token);
      this.setToken(token);
      this.loggedIn = true;
      if (this.lastPath) {
        this._router.push(decodeURIComponent(this.lastPath));
        this.lastPath = null;
      }
    },
    /**
     *  Returns the session session token.
     *  @return {String}  The session token.
     */
    getToken: function() {
      return this.$cookie.get('_token');
    },
    /**
     *  Sets the session token.
     *
     *  @param  {String} token  The token.
     */
    setToken: function(token) {
      return this.$cookie.set('_token', token, '0');
    },
    /**
     *  Returns the current browser bookmark.
     *
     *  @return {String}   Path to the favorite folder.
     */
    getBookmark: function() {
      return this.$cookie.get('bookmark');
    },
    /**
     *  Sets the current browser bookmark.
     *
     *  @param  {String} bookmark   Path to the favorite folder.
     */
    setBookmark: function(bookmark) {
      this.$cookie.set('bookmark', bookmark, { expires: '1Y' });
    },
    /**
     *  Clears the current browser bookmark.
     */
    clearBookmark: function() {
      this.$cookie.delete('bookmark');
    },

    endSession: function() {
      this.$cookie.delete('_token');
      this.$APIManager.endSession();
      this.loggedIn = false;
      this._router.push('/');
    }

  },
  created: function () {
    const token = this.$root.getToken();
    if (token) {
      this.$APIManager.verifyToken(token, response => {
        this.initializing = false;

        if (response.success) {
          this.didAuthenticate(token);
        } else {
          this.didReceiveAuthenticationError();
        }
      });
    } else {
      this.initializing = false;
      this.didReceiveAuthenticationError();
    }
  }
});
