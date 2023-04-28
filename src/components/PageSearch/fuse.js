import Fuse from 'fuse.js'
// import routes from '@/router/routes'
// 在此引入routes为undefined 可能由于webpack不能解决循环引用问题：https://stackoverflow.com/questions/35240716/webpack-import-returns-undefined-depending-on-the-order-of-imports
const options = {
  isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ['title', 'path']
}

function getDataList(routes) {
  function getList(routes, parentPath, resList) {
    for (const route of routes) {
      if (route.meta && route.meta.title && !/:/.test(route.path)) {
        let path = ''
        if (parentPath && parentPath !== '/') {
          path = `${parentPath}/${route.path}`
        } else if (parentPath && parentPath === '/') {
          path = `/${route.path}`
        } else {
          path = route.path
        }
        resList.push({ path, title: route.meta.title })

        if (route.children && route.children.length) {
          getList(route.children, path, resList)
        }
      }
    }
    return resList
  }
  return getList(routes, undefined, [])
}

/**
 *
 * @param {*} routes 路由表
 * @returns Fuse实例
 */
export default function getFuse(routes) {
  return new Fuse(getDataList(routes), options)
}
