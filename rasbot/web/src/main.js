// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueCookie from 'vue-cookie';
import shared from '@/shared/index.js';
import APIManager from '@/shared/APIManager.js';
import Application from '@/shared/application.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;

Vue.use(shared);
Vue.use(VueCookie);
Vue.use(Application);
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
      isLoggedIn: true,
    }
  },
  methods: {

    didAuthenticate: function(token) {
      this.$APIManager.setToken(token);
      // this.$cookie.set('_token', token);
      this.isLoggedIn = true;
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

  }
});
