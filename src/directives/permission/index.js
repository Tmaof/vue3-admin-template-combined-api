import store from '@/store'
export default {
  // 在绑定元素的父组件被挂载后调用
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // 在包含组件的 VNode 及其子组件的 VNode 更新后调用
  update(el, binding) {
    checkPermission(el, binding)
  }
}
function checkPermission(el, binding) {
  const points = store.getters.userInfo.permission.points
  if (!points.includes(binding.value)) {
    // 删除元素
    el.parentNode && el.parentNode.removeChild(el)
  }
}
