import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Browse from '@/components/Browse'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
		{
			path: '/',
			name: 'Main',
			component: Main
		},
		{
			path: '/filesystem/browse/',
			name: 'Browse',
			component: Browse
		}
  ]
})
