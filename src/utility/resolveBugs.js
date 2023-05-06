/**
 * element-plus 报错 ResizeObserver loop limit exceeded 解决
 * https://blog.csdn.net/qq_33733799/article/details/129873731
 */

const debounce = (fn, delay) => {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 0)
    super(callback)
  }
}
