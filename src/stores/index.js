import Vue from 'vue'
import Vuex from 'vuex'
// import Api from '@/api/apis'

Vue.use(Vuex)

const store = new Vuex.Store({
  state () {
    return {
      message: 'hello lee',
      token: '',
      userId: ''
    }
  },
  mutations: {
    setMessage (state, value) {
      state.message = value
    },
    setToken (state, value) {
      state.token = value
    },
    setUserId (state, value) {
      state.userId = value
    }
  },
  actions: {
  }
})

export default store
