// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import APIManager from '@/shared/APIManager.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(APIManager, process.env.API_URL, 60000);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods: {

    setToken: function(token) {
      this.$APIManager.setToken(token);
    }

  }
});
