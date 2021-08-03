import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import home from '#/screens/home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: home,
  },
]

export const appRouter = createRouter({
  history: createWebHashHistory(),
  routes,
})
