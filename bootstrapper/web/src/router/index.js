import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main/Main.vue'
import Login from '@/components/Login/Main.vue'
import Console from '@/components/Console/Main.vue'

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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/console',
      name: 'ConsoleMain',
      component: Console
    }
  ]
})
