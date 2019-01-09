import Vue from 'vue'
import VueRouter from 'vue-router'

import { Home, Login, Register, NotFound, NewCargo } from 'PAGE'
import { store } from 'APP'


Vue.use(VueRouter)


const routes = [
  { path: '/', component: Home, beforeEnter: notGuest },

  // for client
  { path: '/new', component: NewCargo, beforeEnter: notGuest },

  // for assistant
  // for guest
  { path: '/login', component: Login, beforeEnter: isGuest },
  { path: '/register', component: Register, beforeEnter: isGuest },

  // Any other rout will be redirected on NotFound page
  { path: '/404', component: NotFound },
  { path: '*', redirect: '/404' },
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
      // path query on redirect for analitycs or redirect after login
    })
    : next()
}


function isGuest(to, from, next) {
  const {role} = store.state.user

  return role === 'guest'
    ? next()
    : next({ path: '/' })
}
