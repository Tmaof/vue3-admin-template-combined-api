import settings from '@/settings'
/**
 * 设置页面标题
 * @param {string} title
 * @param {boolean} useGlobalTile 是否拼接上全局标题
 */
export default function setDocumentTile(title, useGlobalTile) {
  if (useGlobalTile && settings.pageTile) {
    document.title = `${title}-${settings.pageTile}`
  } else {
    document.title = title
  }
}
