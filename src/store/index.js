import { createStore } from 'vuex'
import getters from './getters'
import user from './modules/user'
import layout from './modules/layout'
export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: { user, layout }
})
