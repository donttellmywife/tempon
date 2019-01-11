import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const { parse, stringify } = JSON
const prevUser = parse(localStorage.getItem('user')) || {}
const guest = { role: 'guest' }


const store = new Vuex.Store({
  state: {
    user: {
      ...guest,
      ...prevUser,
    },
  },


  getters: {
    user(state) {
      return state.user
    },
  },


  mutations: {
    login(state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    logout(state) {
      localStorage.setItem('user', JSON.stringify(guest))
      state.user = guest
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
