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
})


export default store
