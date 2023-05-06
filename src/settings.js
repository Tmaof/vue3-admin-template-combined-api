import i18n from '@/i18n'
export default {
  /**
   * 页面标题
   */
  pageTile: i18n.$t('src.settings.808362-0'),

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
    uniqueOpened: true, // 是否只保持一个子菜单的展开
    // 侧边栏宽度
    initWidth: 200, // 初始宽度，填写整数，单位是px
    minDargWidth: 180, // 最小宽度
    maxDargWidth: 250, // 最大宽度
    mobileCollapseToZero: true // 为移动端页面时，收缩侧边栏宽度到0
  },

  /**
   * 顶部导航栏
   */
  narBarFixed: true, // 是否固定导航条
  narBarSeparator: '/' // 面包屑分隔符
}
