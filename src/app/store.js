import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    user: {
      role: 'guest',
    },
  },


  mutations: {
    login(state, user) {
      state.user = user
    },
    logout(state) {
      state.user = { role: 'guest' }
    },
  },


  // actions: {
  //   login({ commit }, user) {
  //     commit('login', user)
  //   }
  // },
  //
  //
  // methods: {
  //   login() {
  //     this.$store.dispatch('login')
  //   }
  // },
})
// store.commit('login')
// setTimeout(() => { store.commit('login') }, 1000)
// for test purposes


export default store
