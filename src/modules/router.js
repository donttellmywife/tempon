import Vue from 'vue'
import VueRouter from 'vue-router'

import { store } from 'APP'
import { Home, Login, Register, NotFound } from 'PAGE'
import { Create, Update, Read, Assist } from 'PAGE/order'
import { CreateFBA } from 'PAGE/shipment/fba'
import { CreateFBM } from 'PAGE/shipment/fbm'
import ListFBA from 'PAGE/shipment/List.vue'


Vue.use(VueRouter)


const routes = [
  { path: '/', component: Home, beforeEnter: notGuest },


  // for client
  { path: '/orders/new', component: Create, beforeEnter: notGuest },


  {
    path: '/orders/:oid',
    name: 'viewOrder',
    component: Read,
    beforeEnter: notGuest,
  },
  {
    path: '/orders/:oid/edit',
    name: 'editOrder',
    component: Update,
    beforeEnter: isAssistant,
  },


  { path: '/shipment/fba/new', component: CreateFBA, beforeEnter: notGuest },
  { path: '/shipment/fba/', component: ListFBA, beforeEnter: notGuest },


  { path: '/shipment/fbm/new', component: CreateFBM, beforeEnter: notGuest },
  // { path: '/shipment/fbm/', component: ListFBM, beforeEnter: notGuest },


  {
    path: '/client/orders/:oid/edit',
    name: 'assistOrder',
    component: Assist,
    beforeEnter: notGuest,
  },


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
  return store.state.user.role === 'guest'
    ? next({ path: '/login' })
    : next()
}

function isGuest(to, from, next) {
  return store.state.user.role === 'guest'
    ? next()
    : next({ path: '/' })
}

function isAssistant(to, from, next) {
  return store.getters.user.role === 'assistant'
    ? next({ path: `/client${to.path}` })
    : next({ path: to })
}
