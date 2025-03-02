import i18n from '@/i18n'
import store from '@/store'
import { ElMessage } from 'element-plus'
import setDocumentTile from '@/utility/set-document-title'
// 不需要权限的页面
const WhiteRoute = ['/login', '/register']

export function useBeforeEach(router) {
  router.beforeEach(async (to, from, next) => {
    // 设置文章标题
    if (to.meta && to.meta.title) {
      setDocumentTile(to.meta.title, true)
    }
    // 不需要权限的页面
    if (WhiteRoute.includes(to.path)) {
      // 一般来说,有token，不能再次进入登录页
      // 但是,有token,而没有任何私有页面权限的用户可以返回登录注册页
      if (['/login', '/register'].includes(to.path) && store.getters.token) {
        if (!store.getters.userInfo) {
          await store.dispatch('user/getUserInfo')
        }
        if (store.getters.userInfo.permission.menus.length === 0) {
          next()
        } else {
          next(from.path)
        }
      } else {
        next()
      }
      // eslint-disable-next-line brace-style
    }
    // 需要需要权限的页面
    else {
      // 有token，已经登录过
      if (store.getters.token) {
        // 状态仓库中是否有用户信息，
        // 如果有：代表没有刷新页面|不是重新访问web应用，这时是不需要判断token是否过期的。
        if (store.getters.userInfo) {
          next()
          // eslint-disable-next-line brace-style
        }
        // 没有用户信息，代表用户刚刚访问本站
        else {
          // 用已有的token去获取用户信息，看token是否过期
          const ok = await store.dispatch('user/getUserInfo')

          if (ok) {
            // 没有过期，放行
            // 由于在导航守卫中添加了动态路由,所以需要重定向,而不是直接next()
            next(to.fullPath)
          } else {
            // token过期，需要用户重新登录
            // 先清除token，才能跳转登录页
            ElMessage.warning(i18n.$t('router.permission.808363-0'))
            store.commit('user/SET_token', '')
            next('/login')
          }
        }
        // eslint-disable-next-line brace-style
      }
      // 无token,没有登录过,需要让用户登录
      else {
        next('/login')
      }
    }
  })
}
