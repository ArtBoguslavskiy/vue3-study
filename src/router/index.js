import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '../views/events/EventDetails.vue'
import EventEdit from '../views/events/EventEdit.vue'
import EventRegister from '../views/events/EventRegister.vue'
import EventLayout from '../views/events/EventLayout.vue'
import EventCreate from '../views/EventCreate.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import NProgress from 'nprogress'
import GStore from '@/store/reactive'

const AboutView = () =>
  import(/* webpackChunkName: "about" */ '../views/AboutView.vue')

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    component: EventLayout,
    props: true,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true },
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
    ],
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: EventCreate,
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      return { path: `/events/${to.params.afterEvent}` }
    },
  },
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(routeTo, routeFrom, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((routeTo, routeFrom) => {
  NProgress.start()
  const notAuhtorized = true
  if (routeTo.meta.requireAuth && notAuhtorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this.page'

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)

    if (routeFrom.href) {
      return false
    } else {
      return { path: '/' }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
