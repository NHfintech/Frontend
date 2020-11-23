import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import RouterTest from '@/views/RouterTest'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/routertest',
      component: RouterTest,
      props: true
    },
    {
      path: '/login',
      component: Login,
      props: true
    }
  ]
})
