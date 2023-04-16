import { createRouter, createWebHistory } from 'vue-router'
import { useBeforeEach } from './permission'
const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register')
  },
  {
    path: '/',
    component: () => import('@/layout')
  }
]

const router = createRouter({
  // 需要部署的服务器将index.html作为回退
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRoutes
})

// 路由页面权限管理，全局前置导航守卫
useBeforeEach(router)

export default router
