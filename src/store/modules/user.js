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
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((data) => {
            // 保存用户信息到仓库
            commit('SET_userInfo', data)

            resolve()
          })
          .catch((error) => reject(error))
      })
    },
    logout({ commit }) {
      logout().then(() => {
        // 删除token,跳转登录页
        commit('SET_token', '')
        router.push('/login')
      })
    }
  },
  getters: {}
}
