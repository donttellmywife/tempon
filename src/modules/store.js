import Vue from 'vue'
import Vuex from 'vuex'
import { orders, fba } from 'API'

const { parse, stringify } = JSON

Vue.use(Vuex)


const guest = { role: 'guest' }
const prevUser = parse(localStorage.getItem('user')) || {}
const prevOrderStatusTab = localStorage.getItem('ORDERS_STATUS')
const prevFBAStatusTab = localStorage.getItem('FBA_STATUS')


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
      fbas: {
        status: prevFBAStatusTab || '',

        isLoading: false,
        error: '',
      },
    },


    orders: [],
    fbas: [],
    fbms: [],
  },


  getters: {
    user: state => state.user,


    orders: state => state.orders,
    ui_ordersStatus: state => state.ui.orders.status,
    ui_ordersLoading: state => state.ui.orders.isLoading,
    ui_ordersError: state => state.ui.orders.error,


    fbas: state => state.fbas,
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
    orders(state, orders) {
      state.orders = orders
    },
    ordersLoading(state, isLoading) {
      state.ui.orders.isLoading = isLoading
    },
    ordersError(state, error) {
      state.ui.orders.error = error
    },
    filterOrdersByStatus(state, status) {
      localStorage.setItem('ORDERS_STATUS', status)
      state.ui.orders.status = status
    },


    // SHIPMENTS
    // FBA
    fbas(state, shipments) {
      state.fbas = shipments
    },
    fbasLoading(state, isLoading) {
      state.ui.fbas.isLoading = isLoading
    },
    fbasError(state, error) {
      state.ui.fbas.error = error
    },
    filterFBAByStatus(state, status) {
      localStorage.setItem('FBA_STATUS', status)
      state.ui.fbas.status = status
    },
  },


  actions: {
    loadOrders({ commit }) {
      commit('ordersLoading', true)
      commit('ordersError', '')

      orders.list()
        .then(res => res.data)
        .then(items => commit('orders', items))
        .catch(err => commit('ordersError', err.toString()))
        .then(() => commit('ordersLoading', false))
    },


    loadFBAS({ commit }) {
      commit('fbasLoading', true)
      commit('fbasError', '')

      fba.list()
        .then(res => res.data)
        .then(items => commit('fbas', items))
        .catch(err => commit('fbasError', err.toString()))
        .then(() => commit('fbasLoading', false))
    },
  },
})


export default store
