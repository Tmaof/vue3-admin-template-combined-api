import { createApp } from 'vue'
// 根组件
import App from './App.vue'
// 路由
import router from './router'
// vuex
import store from './store'
// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // ElementPlus 的图标
import 'element-plus/theme-chalk/dark/css-vars.css' // 暗夜模式
// scss
import '@/style/index.scss'
// 打包svg图标到style标签
import '@/assets/icon'
// 注册SvgIcon为全局组件
import SvgIcon from '@/components/SvgIcon'
// vue-i18n
import { I18N, elementPlusConf } from '@/i18n'
// 解决 element-plus 导致的「ResizeObserver loop limit exceeded」问题
import '@/utility/resolveBugs'
// filters
import useFilter from '@/filter'
// 自定义指令
import useDirectives from '@/directives'
const app = createApp(App)
  .use(store)
  .use(router)
  .use(I18N)
  .use(ElementPlus, elementPlusConf)

app.component('SvgIcon', SvgIcon)
useFilter(app)
useDirectives(app)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')

export default app
