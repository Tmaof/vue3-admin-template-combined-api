import publicRoutes, { privateRoutes } from '@/router/routes'
import router from '@/router'
export default {
  namespaced: true,
  state() {
    return {
      // state.routes主要用于：侧边栏渲染，页面搜索，
      routes: [],
      userPrivateRoutes: []
    }
  },
  mutations: {
    SET_routes(state, payload) {
      state.routes = payload
    },
    SET_userPrivateRoutes(state, payload) {
      state.userPrivateRoutes = payload
    }
  },
  actions: {
    computedUserRoutes({ commit }, menus) {
      return new Promise((resolve, reject) => {
        // 根据户信息计算出用户所拥有的路由表
        const userPrivateRoutes = getUserPrivateRoutes(privateRoutes, menus)
        // 将计算出的私有路由表添加到vue-router
        addRoutes(userPrivateRoutes)
        // 将用户拥有的私有路由与公有路由合并，保存到state.routes
        // state.routes主要用于：侧边栏渲染，页面搜索，
        commit('SET_routes', [...publicRoutes, ...userPrivateRoutes])
        commit('SET_userPrivateRoutes', userPrivateRoutes)
        resolve()
      })
    },
    resetToPublicRoutes({ state }) {
      return new Promise((resolve) => {
        resetToPublicRoutes(state.userPrivateRoutes)
        resolve()
      })
    }
  }
}

/**
 * 根据户信息计算出用户所拥有的路由表
 * @param {*} flatPrivateRoutes
 * @param {*} menus
 */
function getUserPrivateRoutes(privateRoutes, menus) {
  function auxiliaryFunc(privateRoutes, menus, parentRoute) {
    let retList = null
    let filterRoutes = null
    if (parentRoute) {
      parentRoute.children = privateRoutes.filter((route) =>
        menus.includes(route.name)
      )
      filterRoutes = parentRoute.children
    } else {
      retList = privateRoutes.filter((route) => menus.includes(route.name))
      filterRoutes = retList
    }

    for (const route of filterRoutes) {
      if (route.children && route.children.length) {
        auxiliaryFunc(route.children, menus, route)
      }
    }

    return retList
  }

  return auxiliaryFunc(privateRoutes, menus, null)
}

/**
 * 将计算出的私有路由表添加到vue-router
 * @param {*} routes
 */
function addRoutes(routes) {
  function auxiliaryFunc(routes, parentName = '') {
    for (const route of routes) {
      // 添加嵌套路由
      // https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html#%E6%B7%BB%E5%8A%A0%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1
      if (parentName) {
        router.addRoute(parentName, route)
      } else {
        router.addRoute(route)
      }
      // 先添加父路由再添加子路由
      if (route.children && route.children.length) {
        if (!route.name) {
          // 如果父路由没有name,则随机生成一个name,用于添加嵌套路由
          route.name = Date.now()
        }
        auxiliaryFunc(route.children, route.name)
      }
    }
  }
  auxiliaryFunc(routes)
}

/**
 * 将用户的私有路由删除,来实现重置为公有路由表
 * @param {*} userPrivateRoutes
 */
function resetToPublicRoutes(userPrivateRoutes) {
  for (const route of userPrivateRoutes) {
    // 当路由被删除时，所有的别名和子路由也会被同时删除
    // https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html#%E5%88%A0%E9%99%A4%E8%B7%AF%E7%94%B1
    router.removeRoute(route.name)
  }
}
