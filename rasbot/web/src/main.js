// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueCookie from 'vue-cookie';
import shared from '@/shared/index.js';
import APIManager from '@/shared/APIManager.js';
import Application from '@/shared/application.js';
import DateFormatter from '@/shared/dateformatter.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;

Vue.use(shared);
Vue.use(VueCookie);
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
      isLoggedIn: false,
      lastPath: null
    }
  },
  methods: {

    didReceiveAuthenticationError: function(path) {
      this.lastPath = path;
      this.isLoggedIn = false;
      this._router.push('/');
    },

    didAuthenticate: function(token) {
      this.$APIManager.setToken(token);
      this.$cookie.set('_token', token);
      this.isLoggedIn = true;
      if (this.lastPath) {
        this._router.push(decodeURIComponent(this.lastPath));
        this.lastPath = null;
      }
    },

    getToken: function() {
      return this.$cookie.get("_token");
    },

    getBookmark: function() {
      return this.$cookie.get('bookmark');
    },

    setBookmark: function(bookmark) {
      this.$cookie.set('bookmark', bookmark);
    },

    clearBookmark: function() {
      this.$cookie.delete('bookmark');
    }

  },
  created: function () {
    const token = this.$root.getToken();
    if (token) this.didAuthenticate(token);
  }
});
