export default {
  /**
   * 页面标题
   */
  pageTile: '后台管理',

  /**
   * 侧边栏
   */
  sideBar: {
    // sideBarLogo: {
    //   isShow: true,
    //   type: 'text', // 'text'or'img'
    //   value: '后台管理系统'
    // },
    sideBarLogo: {
      isShow: true,
      type: 'img', // 'text'or'img'
      value: '/favicon.ico'
    },
    uniqueOpened: true // 是否只保持一个子菜单的展开
  },

  /**
   * 顶部导航栏
   */
  narBarFixed: true, // 是否固定导航条
  narBarSeparator: '/' // 面包屑分隔符
}
