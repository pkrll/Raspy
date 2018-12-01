import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main/Main.vue';
import Browser from '@/components/Browser/Main/Main.vue';
import File from '@/components/Browser/File/File.vue';
import Dashboard from '@/components/Dashboard/Dashboard.vue';
import RebootSystem from '@/components/Dashboard/Reboot/Reboot.vue';
import ShutdownSystem from '@/components/Dashboard/Shutdown/Shutdown.vue';
import Menu from '@/components/Menu/Main.vue';
import Settings from '@/components/Settings/Main.vue';
import SettingsBrowser from '@/components/Settings/Browser/Browser.vue';
import SettingsDashboard from '@/components/Settings/Dashboard/Dashboard.vue';
import SettingsAccount from '@/components/Settings/Account/Account.vue';
import SettingsAccountPassword from '@/components/Settings/Account/Password/Password.vue';
import Control from '@/components/Control/Control.vue';
import UpdateRaspbot from '@/components/Control/Update/Update.vue';
import RebootRaspbot from '@/components/Control/Reboot/Reboot.vue';
import ShutdownRaspbot from '@/components/Control/Shutdown/Shutdown.vue';
import Devices from '@/components/Advanced/Devices/Devices.vue';

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
			path: '/dashboard/reboot',
			name: 'RebootSystem',
			component: RebootSystem,
			meta: {
				tab: 2,
				requiresAuth: true
			}
		},
    {
			path: '/dashboard/Shutdown',
			name: 'ShutdownSystem',
			component: ShutdownSystem,
			meta: {
				tab: 2,
				requiresAuth: true
			}
		},
    {
      path: '/menu',
      name: 'Menu',
      component: Menu,
      meta: {
        tab: 3,
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
      path: '/control',
      name: 'Control',
      component: Control,
      meta: {
        tab: 3,
        requiresAuth: true
      }
    },
    {
      path: '/control/update',
      name: 'Update',
      component: UpdateRaspbot,
      meta: {
        tab: 3,
        requiresAuth: true
      }
    },
    {
      path: '/control/reboot',
      name: 'Reboot',
      component: RebootRaspbot,
      meta: {
        tab: 3,
        requiresAuth: true
      }
    },
    {
      path: '/control/shutdown',
      name: 'Shutdown',
      component: ShutdownRaspbot,
      meta: {
        tab: 3,
        requiresAuth: true
      }
    },
    {
      path: '/advanced/devices',
      name: 'Devices',
      component: Devices,
      meta: {
        tab: 3,
        requiresAuth: true
      }
    }
  ]
});
