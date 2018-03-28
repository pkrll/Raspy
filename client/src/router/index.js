import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Browse from '@/components/Filesystem/Browse'
import File from '@/components/Filesystem/File'
import SystemMain from '@/components/System/Main'

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
			component: Browse,
			meta: {
				tab: 1,
				requiresAuth: true
			}
		},
		{
			path: '/filesystem/browse/:path',
			name: 'Browse path',
			component: Browse,
			props: true,
			meta: {
				tab: 1,
				requiresAuth: true
			}
		},
		{
			path: '/filesystem/file/:path',
			name: 'File',
			component: File,
			props: true,
			meta: {
				tab: 1,
				requiresAuth: true
			}
		},
		{
			path: '/system',
			name: 'System',
			component: SystemMain,
			meta: {
				tab: 2,
				requiresAuth: true
			}
		}
  ]
})
