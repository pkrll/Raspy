import Vue from 'vue'
import Router from 'vue-router'
import VueSocketIO from 'vue-socket.io';
import Main from '@/components/Main'
import Browser from '@/components/Browser/Main'
import File from '@/components/Browser/File'
import Dashboard from '@/components/Dashboard/Main'
import Settings from '@/components/Settings/Main'
import SettingsBrowser from '@/components/Settings/Browser'
import SettingsDashboard from '@/components/Settings/Dashboard'
import SettingsAccount from '@/components/Settings/Account'
import SettingsGeneral from '@/components/Settings/General'
import SettingsUpdate from '@/components/Settings/Update'
import Update from '@/components/Update/Main'

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
			path: '/browser/',
			name: 'Browser',
			component: Browser,
			meta: {
				tab: 1,
				requiresAuth: true
			}
		},
		{
			path: '/browser/:path',
			name: 'Directory',
			component: Browser,
			props: true,
			meta: {
				tab: 1,
				requiresAuth: true
			}
		},
		{
			path: '/Browser/:path',
			name: 'File',
			component: File,
			props: true,
			meta: {
				tab: 1,
				requiresAuth: true
			}
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard,
			meta: {
				tab: 2,
				requiresAuth: true
			}
		},
		{
			path: '/settings',
			name: 'Settings',
			component: Settings,
			meta: {
				tab: 3,
				requiresAuth: true
			}
		},
		{
			path: '/settings/browser',
			name: 'Settings: Browser',
			component: SettingsBrowser,
			meta: {
				tab: 3,
				requiresAuth: true
			}
		},
		{
			path: '/settings/dashboard',
			name: 'Settings: Dashboard',
			component: SettingsDashboard,
			meta: {
				tab: 3,
				requiresAuth: true
			}
		},
		{
			path: '/settings/account',
			name: 'Settings: Account',
			component: SettingsAccount,
			meta: {
				tab: 3,
				requiresAuth: true
			}
		},
		{
			path: '/settings/general',
			name: 'Settings: General',
			component: SettingsGeneral,
			meta: {
				tab: 3,
				requiresAuth: true
			}
		},
		{
			path: '/settings/update',
			name: 'Check for update',
			component: SettingsUpdate,
			meta: {
				tab: 3,
				requiresAuth: true
			}
		},
		{
			path: '/update',
			name: 'Update',
			component: Update,
			meta: {
				tab: 3,
				requiresAuth: true
			}
		}
  ]
})
