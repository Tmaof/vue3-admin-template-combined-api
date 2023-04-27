import { createI18n } from 'vue-i18n'
import { computed, isRef, reactive } from 'vue'
import { getItem, setItem } from '@/utility/storage'
import { USERLANGUAGE } from '@/constant'
import LK from './languageKeys'
import zh from './locale/zh'
import en from './locale/en'
import elePlusZh from 'element-plus/dist/locale/zh-cn.mjs' // 中文包
import elePlusEn from 'element-plus/dist/locale/en.min.mjs' // element-plus的英文包
// 用于注册vue插件
const defaultLocale = getItem(USERLANGUAGE) || LK.en
export const I18N = createI18n({
  legacy: false,
  globalInjection: true,
  messages: {
    [LK.zh]: zh,
    [LK.en]: en
  },
  locale: defaultLocale
})

// 语言选择的组件会使用到
export const langList = [
  { label: '中文', value: LK.zh },
  { label: 'english', value: LK.en }
]

// 自定义$t方法，返回一个计算属性，主要用于解决在js模块中使用t函数生成的语言不具备响应性的问题
// （具体来说就是使用i18n.locale切换语言时，在js模块中定义的i18n语言不会改变，只有vue模板语法中的才改变）
// 所以我定义了这么个函数来返回一个计算属性（ref对象），当然在js模块中使用时，你需要记得解包（.value），因为它是一个ref对象.
I18N.global.$t = function (key) {
  return computed(() => I18N.global.t(key))
}

// 获取计算属性的value
export function getI18nValue(value) {
  if (isRef(value)) {
    return value.value
  } else {
    return value
  }
}

// element-plus国际化
const elePlusLangList = {
  [LK.en]: elePlusEn,
  [LK.zh]: elePlusZh
}
//  element-plus的一个配置对象，在main.js中引入，必须使用reactive包裹
export const elementPlusConf = reactive({
  locale: elePlusLangList[defaultLocale]
})

// 改变全局的语言,包括本地的和element-plus的
export function changeGlobalLanguage(key) {
  I18N.global.locale.value = key // 改变本地的语言
  elementPlusConf.locale = elePlusLangList[key] // 改变element-plus的语言
  // 将使用的语言记录到本地存储
  setItem(USERLANGUAGE, key)
}

// 用于在js模块中使用i18n.t(),i18n.$t()方法,因为组合式useI18n只能在vue模板中的setup中使用
export default I18N.global
