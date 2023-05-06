import { watch, ref } from 'vue'
// route为undefined
// import { useRoute } from 'vue-router'
// const route = useRoute()

export function getTagsList(route) {
  const tagsList = ref([])
  watch(
    route,
    (newVar) => {
      const { fullPath, meta = null } = newVar
      if (meta && meta.title) {
        const isExist = tagsList.value.find((item) => item.path === fullPath)
        if (!isExist) {
          tagsList.value.unshift({ path: fullPath, title: meta.title }) // 最新的放在开头
        }
      }
    },
    {
      immediate: true
    }
  )

  return tagsList
}
