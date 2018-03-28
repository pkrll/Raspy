// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Raspy from '@/shared/raspy'
import Bookmarker from '@/shared/bookmarker'
import DateFormatter from '@/shared/dateformatter'
import APIManager from '@/shared/network/apimanager'

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
	if (to.matched.some(record => record.meta.requiresAuth) && router.app.isLoggedIn == false) {
		next({ path: '/' });
	} else {
		window.scrollTo(0, 0);
		next();
	}
});

Vue.use(Bookmarker);
Vue.use(DateFormatter);
Vue.use(APIManager);
Vue.use(Raspy);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	data: {
		isLoggedIn: false
	},
  components: { App },
  template: '<App/>'
})
