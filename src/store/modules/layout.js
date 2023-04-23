import getScreenInfo from '@/utility/get-screen-info'
export default {
  namespaced: true,
  state() {
    return {
      // 是否折叠侧边栏
      isCollapseSideBar: false,
      // 设备屏幕信息
      screenInfo: getScreenInfo()
    }
  },
  mutations: {
    SET_isCollapseSideBar(state, payload) {
      state.isCollapseSideBar = payload
    }
  },
  actions: {},
  getters: {}
}
