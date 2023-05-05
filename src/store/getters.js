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
  isMobile: (state) => state.layout.screenInfo.isMobile,
  routes: (state) => state.routes.routes
}
