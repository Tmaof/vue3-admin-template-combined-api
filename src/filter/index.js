import dayjs from 'dayjs'

export function dateFilter(val, format = 'YYYY-MM-DD') {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

export default function useFilter(vueApp) {
  vueApp.config.globalProperties.$filters = {
    dateFilter
  }
}
