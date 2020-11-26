import Vue from 'vue'
import store from '@/store/index'
import Router from 'vue-router'
import Signup from '@/views/Signup'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Event from '@/views/Event'
import CreateEvent from '@/views/CreateEvent'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/event/create',
      component: CreateEvent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/event/:id',
      component: Event,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.token === undefined) {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
