import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import AboutView from '../views/AboutView.vue'
import EventDetails from '../views/events/EventDetails.vue'
import EventEdit from '../views/events/EventEdit.vue'
import EventRegister from '../views/events/EventRegister.vue'
import EventLayout from '../views/events/EventLayout.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: '/event/:id',
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
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
    ],
  },
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
