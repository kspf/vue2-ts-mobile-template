import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Test from '@/views/Test/Test.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Test',
    component: Test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
