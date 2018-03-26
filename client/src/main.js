// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Bookmarker from '@/shared/bookmarker'

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0);
  next();
});

Vue.use(Bookmarker);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
