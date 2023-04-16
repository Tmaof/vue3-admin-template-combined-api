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
// ElementPlus 的图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 使用mock模拟数据
import '@/mock'

// scss
import '@/assets/scss/reset.scss'
// 打包svg图标到style标签
import '@/assets/icon'
// 注册SvgIcon为全局组件
import SvgIcon from '@/components/SvgIcon'
const app = createApp(App).use(store).use(router).use(ElementPlus)

app.component('SvgIcon', SvgIcon)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
