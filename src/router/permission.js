import store from '@/store'
import { ElMessage } from 'element-plus'
import setDocumentTile from '@/utility/set-document-title'
// 不需要权限的页面
const WhiteRoute = ['/login', '/register']

export function useBeforeEach(router) {
  router.beforeEach((to, from, next) => {
    // 设置文章标题
    if (to.meta && to.meta.title) {
      setDocumentTile(to.meta.title, true)
    }

    // 不需要权限的页面
    if (WhiteRoute.includes(to.path)) {
      // 有token，不能再次进入登录页
      if (['/login', '/register'].includes(to.path) && store.getters.token) {
        next(from.path)
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
          store
            .dispatch('user/getUserInfo')
            .then(() => {
              // 没有过期，放行
              next()
            })
            .catch(() => {
              // token过期，需要用户重新登录
              // 先清除token，才能跳转登录页
              ElMessage.warning('用户认证已经过期，请重新登录！谢谢')
              store.commit('user/SET_token', '')
              next('/login')
            })
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
