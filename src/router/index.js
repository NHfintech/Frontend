import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/views/Signup'
// import RouterTest from '@/components/RouterTest'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    // {
    //   path: '/routertest',
    //   component: RouterTest,
    //   props: true
    // },
    {
      path: '/login',
      component: Login,
      props: true
    },
    {
      path: '/login',
      component: Login,
      props: true
    }
  ]
})
