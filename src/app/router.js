import Vue from 'vue'
import VueRouter from 'vue-router'

import { About, Home, Login, Register } from 'PAGE'
import store from './store.js'


Vue.use(VueRouter)


const routes = [
  // for guests
  { path: '/', component: Home, beforeEnter: notGuest },
  { path: '/about', component: About, beforeEnter: notGuest },

  // for registered
  { path: '/login', component: Login, beforeEnter: notUser },
  { path: '/register', component: Register, beforeEnter: notUser },
]


const router = new VueRouter({
  mode: 'history',
  routes,
})


export default router


// access rights validations
function notGuest(to, from, next) {
  const {role} = store.state.user

  return role === 'guest'
    ? next({
      path: '/login',
      // query: {redirect: to.fullPath},
      // path query on redirect for analitycs or something
    })
    : next()
}


function notUser(to, from, next) {
  const {role} = store.state.user
  console.log(role, store.state.route)
  return role === 'guest'
    ? next()
    : next({
      path: '/',
    })
}
