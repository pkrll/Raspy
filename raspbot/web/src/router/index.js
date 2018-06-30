import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main/Main.vue';
import Browser from '@/components/Browser/Main/Main.vue';
import File from '@/components/Browser/File/File.vue';
import Dashboard from '@/components/Dashboard/Dashboard.vue';
import Settings from '@/components/Settings/Main.vue';
import SettingsBrowser from '@/components/Settings/Browser/Browser.vue';
import SettingsDashboard from '@/components/Settings/Dashboard/Dashboard.vue';
import SettingsAccount from '@/components/Settings/Account/Account.vue';
import SettingsGeneral from '@/components/Settings/General/General.vue';
import SettingsUpdate from '@/components/Settings/General/Update/Main.vue';
import SettingsAccountPassword from '@/components/Settings/Account/Password/Password.vue';
import Bootstrapper from '@/components/Bootstrapper/Bootstrapper.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
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
		},
    {
			path: '/browser/file/:path',
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
      name: 'SettingsBrowser',
      component: SettingsBrowser,
      meta: {
        tab: 3,
        requiresAuth: true
      }
    },
    {
      path: '/settings/dashboard',
      name: 'SettingsDashboard',
      component: SettingsDashboard,
      meta: {
        tab: 3,
        requiresAuth: true
      }
    },
    {
      path: '/settings/account',
      name: 'SettingsAccount',
      component: SettingsAccount,
      meta: {
        tab: 3,
        requiresAuth: true
      }
    },
    {
      path: '/settings/account/password',
      name: 'AccountPassword',
      component: SettingsAccountPassword,
      meta: {
        tab: 3,
        requiresAuth: true
      }
    },
    {
      path: '/settings/general',
      name: 'SettingsGeneral',
      component: SettingsGeneral,
      meta: {
        tab: 3,
        requiresAuth: true
      }
    },
    {
      path: '/settings/general/Update',
      name: 'SettingsUpdate',
      component: SettingsUpdate,
      meta: {
        tab: 3,
        requiresAuth: true
      }
    },
    {
      path: '/bootstrapper',
      name: 'Bootstrapper',
      component: Bootstrapper,
      meta: {
        tab: 3,
        requiresAuth: true
      }
    }
  ]
});
