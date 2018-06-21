// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Raspy from '@/shared/raspy'
import Cookies from '@/shared/cookies'
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

Vue.use(Cookies);
Vue.use(DateFormatter);
Vue.use(APIManager);
Vue.use(Raspy);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	components: { App },
  template: '<App/>',
	data: {
		isLoggedIn: false,
		fullScreen: false,
		connectionError: undefined
	},
	created: function () {
		let username = this.$CookieManager.loadCookie('username');
		let password = this.$CookieManager.loadCookie('password');

		if (username != undefined) {
			this.$APIManager.setCredentials(username, password);
			this.isLoggedIn = true;
			this.$APIManager.testCredentials(this.didTestCredentials);
		}
	},
	methods: {
		/**
		 * Creates a new session.
		 *
		 * @param  {String} username The username.
		 * @param  {String} password The password.
		 */
		createSession: function (username, password) {
			let autoLogin = this.$CookieManager.loadCookie('autoLogin');
			let expires  	= (autoLogin) ? false : undefined;

			this.$CookieManager.saveCookie('username', username, expires);
			this.$CookieManager.saveCookie('password', password, expires);
			this.isLoggedIn = true;
		},
		/**
		 * Deletes an active session.
		 */
		deleteSession: function () {
			this.$CookieManager.clearCookie('username');
			this.$CookieManager.clearCookie('password');
			this.$APIManager.clearCredentials();
			this.isLoggedIn = false;
		},
		/**
		 * Callback for testCredentials.
		 *
		 * @param  {Object} response The response from the server.
		 */
		didTestCredentials: function (response) {
			if (response.status == 0) {
				this.connectionError = response.error;
				this.isLoggedIn = false;
			}
		}
	}
})
