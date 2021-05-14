import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Current from '../components/Current.vue'
import Week from '../components/Week.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'current',
        component: Current
      },
      {
        path: 'week',
        component: Week
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
