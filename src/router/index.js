import Vue from 'vue'
import store from '@/store/index'
import Router from 'vue-router'
import Login from '@/views/Login'
import Main from '@/views/Main'
import Home from '@/views/Home'
import EventParticipated from '@/views/EventParticipated'
import Event from '@/views/Event'
import EventCreate from '@/views/EventCreate'
import EventEdit from '@/views/EventEdit'
import QRCode from '@/views/QRCode'
import FinAccount from '@/views/FinAccount'
import FinTransfer from '@/views/FinTransfer'
import Invite from '@/views/Invite'
import EventBreakdown from '@/views/EventBreakdown'
import MyBreakDown from '@/views/MyBreakdown'
import PageNotFound from '@/views/PageNotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        requiresAuth: true,
        requiresFinAccount: true
      },
      children: [
        {
          path: '/',
          component: Main
        },
        {
          path: '/breakdown',
          component: MyBreakDown
        },
        {
          path: '/event/participated',
          component: EventParticipated
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/404',
      component: PageNotFound
    },
    {
      path: '/login',
      component: Login
    },

    {
      path: '/event/create',
      component: EventCreate,
      meta: {
        requiresAuth: true,
        requiresFinAccount: true
      }
    },
    {
      path: '/event/edit/:id',
      component: EventEdit,
      meta: {
        requiresAuth: true,
        requiresFinAccount: true
      }
    },
    {
      path: '/event/:id',
      component: Event,
      meta: {
        requiresAuth: true,
        requiresFinAccount: true
      }
    },
    {
      path: '/qrcode/:hash',
      component: QRCode,
      meta: {
        requiresAuth: true,
        requiresFinAccount: true
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
      component: FinTransfer
    },
    {
      path: '/invite/:hash',
      component: Invite
    },
    {
      path: '/event/:id/breakdown',
      component: EventBreakdown,
      meta: {
        requiresAuth: true,
        requiresFinAccount: true
      }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresFinAccount)) {
    if (store.state.user.fin_account === null) {
      next({
        path: '/fin/account',
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
