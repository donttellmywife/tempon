import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const { parse, stringify } = JSON
const guest = { role: 'guest' }
const prevUser = parse(localStorage.getItem('user')) || {}


const store = new Vuex.Store({
  state: {
    user: {
      ...guest,
      ...prevUser,
    },

    // orders: {
    //   showStatus: '',
    // },
    // shipments: {
    //
    // },
  },


  getters: {
    user: state => state.user,
  },


  mutations: {
    login(state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    logout(state) {
      localStorage.setItem('user', JSON.stringify(guest))
      state.user = {...guest}
    },
  },
})


export default store
