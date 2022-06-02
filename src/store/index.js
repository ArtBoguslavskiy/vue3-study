import { createStore } from 'vuex'
import user from './modules/user'
import event from './modules/event'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { user, event },
})
