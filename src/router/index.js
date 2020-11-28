import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/views/Signup'
// import RouterTest from '@/components/RouterTest'
import Login from '@/views/Login'
import HelloWorld from '@/views/HelloWorld'
import Main from '@/views/Main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/login',
      component: Login,
      props: true
    },
    {
      path: '/main',
      component: Main,
      props: true
    }
  ]
})
