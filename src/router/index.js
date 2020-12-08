import Vue from 'vue'
import store from '@/store/index'
import Router from 'vue-router'
import Signup from '@/views/Signup'
import Login from '@/views/Login'
import Main from '@/views/Main'
import Home from '@/views/Home'
import Event from '@/views/Event'
import EventCreate from '@/views/EventCreate'
import EventEdit from '@/views/EventEdit'
import QRCode from '@/views/QRCode'
import FinAccount from '@/views/FinAccount'
import FinTransfer from '@/views/FinTransfer'
import Invite from '@/views/Invite'

Vue.use(Router)

const router = new Router({
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
      path: '/main',
      component: Main
    },
    {
      path: '/event/create',
      component: EventCreate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/event/edit/:id',
      component: EventEdit,
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
    },
    {
      path: '/qrcode/:hash',
      component: QRCode,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/fin/account',
      component: FinAccount,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/fin/transfer/:hash',
      component: FinTransfer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/invite/:hash',
      component: Invite
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.token === undefined) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
