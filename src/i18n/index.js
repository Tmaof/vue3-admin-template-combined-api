import { createI18n } from 'vue-i18n'
import zh from '@/i18n/locale/zh.json'
import en from '@/i18n/locale/en.json'
const messages = {
  zh,
  en
}

export const I18N = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: 'en', // 设置地区
  messages // 设置地区信息
})

export default I18N.global
