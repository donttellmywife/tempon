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
    orders: [],
  },


  getters: {
    user: state => state.user,
    orders: state => state.orders,
    order: state => fid => state.orders.filter(({ id }) => id === parseInt(fid, 10)).pop(),
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
    setOrders(state, orders) {
      state.orders = orders
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


export default store
