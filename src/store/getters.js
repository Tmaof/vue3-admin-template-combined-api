export default {
  token(state) {
    return state.user.token
  },
  userInfo(state) {
    return state.user.userInfo
  },
  isCollapseSideBar(state) {
    return state.layout.isCollapseSideBar
  },
  screenInfo: (state) => state.layout.screenInfo,
  routes: (state) => state.routes.routes
}
