import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main/Main.vue'
import Login from '@/components/Login/Main.vue'

Vue.use(Router);

export default new Router({
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
    }
  ]
})
