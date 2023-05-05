import { createRouter, createWebHistory } from 'vue-router'
import { useBeforeEach } from './permission'
import routes from './routes'

const router = createRouter({
  // 需要部署的服务器将index.html作为回退
  history: createWebHistory(process.env.BASE_URL),
  // 根据用户权限信息进行计算后得到的路由
  routes: routes()
})

// 路由页面权限管理，全局前置导航守卫
useBeforeEach(router)

export default router
