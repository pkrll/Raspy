// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueSocketio from 'vue-socket.io';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.use(VueSocketio, 'http://localhost:5001');

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
  }
});
