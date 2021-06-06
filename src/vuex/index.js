import { createStore } from 'vuex'

const store = createStore({
  state: {
    count: 0,
    token: ""
  },
  mutations: {
    increment (state) {
      state.count++
    },
    changeToken(state, token) {
      state.token = token;
    }
  }
})

export default store;