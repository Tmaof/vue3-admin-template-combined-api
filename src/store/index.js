import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'
import layout from './modules/layout'
import routes from './modules/routes'
export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: { user, layout, routes }
})
