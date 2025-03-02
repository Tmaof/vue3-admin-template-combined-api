import i18n from '@/i18n'
import { ElMessage } from 'element-plus'
/**
 * 浏览器是否支持storge,或者是否开启
 * @param {*} type
 * @returns
 */
function storageAvailable(type) {
  let storage
  try {
    storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    )
  }
}

export function setItem(key, value) {
  if (!storageAvailable('localStorage')) {
    ElMessage.warning(i18n.$t('utility.storage.808362-0'))
    return
  }

  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  // value是字符串就直接存储
  localStorage.setItem(key, value)
}

export function getItem(key) {
  let value = localStorage.getItem(key)
  try {
    value = JSON.parse(value)
  } catch (e) {
    // console.log(e)//字符串
  }
  return value
}

export function deleteItem(key) {
  localStorage.removeItem(key)
}

export function clearItem() {
  localStorage.clear()
}
