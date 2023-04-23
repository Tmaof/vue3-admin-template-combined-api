import { reactive } from 'vue'
const screenInfo = reactive({ isMobile: true, width: 0 })
function getInfo() {
  screenInfo.width = window.innerWidth
  screenInfo.isMobile = window.innerWidth < 768
}
window.onload = getInfo
window.onresize = getInfo
export default function getScreenInfo() {
  return screenInfo
}
