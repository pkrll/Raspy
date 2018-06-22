// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueCookie from 'vue-cookie';
import VueSocketio from 'vue-socket.io';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.use(VueCookie);
Vue.use(VueSocketio, process.env.SOCKET_URL);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: function() {
    return {
      isLoggedIn: false
    }
  },
  methods: {

    setSession: function (username, password) {
      this.isLoggedIn = true;
    },

    authenticate: function (username, password, callback) {
      let auth = { username: username, password: password };
      this.$socket.emit('authentication', auth);

      this.$socket.on('authenticated', () => {
        this.$cookie.set('username', username, { expires: '1Y' });
        this.$cookie.set('password', password, { expires: '1Y' });
        this.isLoggedIn = true;

        if (typeof callback === 'function') callback(true, null);
      });

      this.$socket.on('unauthorized', (error) => {
        if (typeof callback === 'function') callback(false, error.message);
      });
    }
  },
  created: function() {
    let username = this.$cookie.get('username');
    let password = this.$cookie.get('password');

    if (username != undefined || username != null) {
      this.authenticate(username, password);
    }
  }
});
