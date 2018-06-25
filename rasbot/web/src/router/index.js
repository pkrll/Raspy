import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main/Main.vue';
import Browser from '@/components/Browser/Main/Main.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/browse',
      name: 'Browser',
      component: Browser,
      meta: {
				tab: 1,
				requiresAuth: true
			}
    },
    {
			path: '/browse/:path',
			name: 'Directory',
			component: Browser,
			props: true,
			meta: {
				tab: 1,
				requiresAuth: true
			}
		}
  ]
});
