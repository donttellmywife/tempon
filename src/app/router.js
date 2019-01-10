import Vue from 'vue'
import VueRouter from 'vue-router'

import { store } from 'APP'
import { Home, Login, Register, NotFound } from 'PAGE'
import { Create } from 'PAGE/order'


Vue.use(VueRouter)


const routes = [
  { path: '/', component: Home, beforeEnter: notGuest },


  // for client
  { path: '/orders/new', component: Create, beforeEnter: notGuest },

  // TODO:
  // { path: '/orders', component: NewCargo, beforeEnter: notGuest },
  // { path: '/orders/:oid', component: NewCargo, beforeEnter: notGuest },
  // { path: '/orders/:oid/edit', component: NewCargo, beforeEnter: notGuest },


  // for assistant
  // TODO:
  // { path: '/client/:id', component: NewCargo, beforeEnter: notGuest },
  // { path: '/client/:id/orders', component: NewCargo, beforeEnter: notGuest },
  // { path: '/client/:id/orders/:oid', component: NewCargo, beforeEnter: notGuest },
  // { path: '/client/:id/orders/:oid/edit', component: NewCargo, beforeEnter: notGuest },

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


// ACCESS VALIDATORS
function notGuest(to, from, next) {
  const { role } = store.state.user

  return role === 'guest'
    ? next({
      path: '/login',
      // query: {redirect: to.fullPath},
      // path query on redirect for analitycs or redirect after login
    })
    : next()
}


function isGuest(to, from, next) {
  const { role } = store.state.user

  return role === 'guest'
    ? next()
    : next({ path: '/' })
}
