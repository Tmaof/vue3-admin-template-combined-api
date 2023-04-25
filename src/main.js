import { createApp } from 'vue'
// 根组件
import App from './App.vue'
// 路由
import router from './router'
// vuex
import store from './store'
// ElementPlus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 中文包
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // ElementPlus 的图标
import 'element-plus/theme-chalk/dark/css-vars.css' // 暗夜模式
// 使用mock模拟数据
import '@/mock'
// scss
import '@/style/index.scss'
// 打包svg图标到style标签
import '@/assets/icon'
// 注册SvgIcon为全局组件
import SvgIcon from '@/components/SvgIcon'
// 国际化 vue-i18n
import { I18N } from '@/i18n'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(I18N)
  .use(ElementPlus, { locale: zhCn })

app.component('SvgIcon', SvgIcon)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
