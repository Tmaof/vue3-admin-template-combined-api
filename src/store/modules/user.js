import { login, getUserInfo, logout } from '@/api/sys'
import { setItem, getItem } from '@/utility/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
export default {
  namespaced: true,
  state() {
    return {
      // 每次刷新页面，vuex的状态就会丢失，需要从本地保存中获取
      token: getItem(TOKEN) || '',
      userInfo: null
    }
  },
  mutations: {
    SET_token(state, payload) {
      state.token = payload
      // 本地持久化存储token
      setItem(TOKEN, payload)
    },
    SET_userInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload)
          .then((data) => {
            // 登录成功，保存token
            commit('SET_token', data.token)
            resolve()
          })
          .catch((error) => reject(error))
      })
    },
    getUserInfo({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(async (data) => {
            // 保存用户信息到仓库
            commit('SET_userInfo', data)
            // 等待路由计算完成
            // 启用了命名空间的 getter 和 action 会收到局部化的 getter，dispatch 和 commit。
            // 若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
            await dispatch('routes/computedUserRoutes', data.permission.menus, {
              root: true
            })
            resolve(true)
          })
          .catch(() => {
            // eslint-disable-next-line prefer-promise-reject-errors
            resolve(false)
          })
      })
    },
    logout({ commit, dispatch }) {
      logout().then(async () => {
        // 删除token
        commit('SET_token', '')
        // 删除用户信息
        commit('SET_userInfo', null)
        // 重置vue-router为公有路由表
        await dispatch('routes/resetToPublicRoutes', null, { root: true })
        // 跳转登录页
        router.push('/login')
      })
    }
  },
  getters: {}
}
