import Vue from 'vue'
import Vuex from 'vuex'
import { orders } from 'API'

const { list } = orders
const { parse, stringify } = JSON

Vue.use(Vuex)


const guest = { role: 'guest' }
const prevUser = parse(localStorage.getItem('user')) || {}
const prevOrderStatusTab = localStorage.getItem('ordersStatusTab')


const store = new Vuex.Store({
  state: {
    user: {
      ...guest,
      ...prevUser,
    },

    ui: {
      orders: {
        status: prevOrderStatusTab || '',

        isLoading: false,
        error: '',
      },
    },

    orders: [],
    shipments: {
      fba: [],
      fbm: [],
    },
  },


  getters: {
    user: state => state.user,

    // orders
    orders: state => state.orders,
    ui_ordersStatus: state => state.ui.orders.status,
    ui_ordersLoading: state => state.ui.orders.isLoading,
    ui_ordersError: state => state.ui.orders.error,
  },


  mutations: {
    // AUTH
    login(state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    logout(state) {
      localStorage.setItem('user', JSON.stringify(guest))
      state.user = {...guest}
    },

    // ORDERS
    filterOrdersByStatus(state, status) {
      localStorage.setItem('ordersStatusTab', status)
      state.ui.orders.status = status
    },
    orders(state, orders) {
      state.orders = orders
    },
    ordersLoading(state, isLoading) {
      state.ui.orders.isLoading = isLoading
    },
    ordersError(state, error) {
      state.ui.orders.error = error
    },

    // SHIPMENTS
    // FBA
  },


  actions: {
    loadOrders({ commit }) {
      commit('ordersLoading', false)
      commit('ordersLoading', '')

      list()
        .then(res => res.data)
        .then(items => commit('orders', items))
        .catch(err => commit('ordersError', err.toString()))
        .then(() => commit('ordersLoading', false))
    },
  },
})


export default store
