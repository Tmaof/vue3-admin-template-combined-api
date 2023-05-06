import { watch } from 'vue'
import settings from '@/settings'
import { getI18nValue } from '@/i18n'
/**
 * 设置页面标题
 * @param {string} title
 * @param {boolean} useGlobalTile 是否拼接上全局标题
 */
export default function setDocumentTile(title, useGlobalTile) {
  watch(
    title,
    () => {
      if (useGlobalTile && settings.pageTile) {
        document.title = `${getI18nValue(title)}-${getI18nValue(
          settings.pageTile
        )}`
      } else {
        document.title = getI18nValue(title)
      }
    },
    { immediate: true }
  )
}
