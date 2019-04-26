import Vue from 'vue'
import VueRouter from 'vue-router'

import { store } from 'APP'
import { Home, Login, Register, NotFound } from 'PAGE'
import { Create, Update, Read, Assist } from 'PAGE/order'
import { CreateFBM, ReadFBM, UpdateFBM, AssistFBM } from 'PAGE/shipment/fbm'
import { CreateFBA, ReadFBA, AssistFBA, UpdateFBA } from 'PAGE/shipment/fba'
import ListFBA from 'PAGE/shipment/List.vue'


Vue.use(VueRouter)


const routes = [
  // for registered user
  { path: '/', component: Home, beforeEnter: notGuest },


  { path: '/orders', component: Home, beforeEnter: notGuest, name: 'listOrders' },
  { path: '/orders/new', component: Create, beforeEnter: notGuest },
  { path: '/orders/:oid', component: Read, beforeEnter: notGuest, name: 'viewOrder' },
  { path: '/orders/:oid/edit', component: Update, beforeEnter: notGuest, name: 'editOrder' },
  { path: '/orders/:oid/assist', component: Assist, beforeEnter: isAssistant, name: 'assistOrder' },


  { path: '/shipments', component: ListFBA, beforeEnter: notGuest },

  { path: '/shipments/fbm/new', component: CreateFBM, beforeEnter: notGuest },
  { path: '/shipments/fbm/:sid', component: ReadFBM, beforeEnter: notGuest, name: 'viewFBM' },
  { path: '/shipments/fbm/:sid/edit', component: UpdateFBM, beforeEnter: notGuest, name: 'updateFBM' },
  { path: '/shipments/fbm/:sid/assist', component: AssistFBM, beforeEnter: notGuest, name: 'assistFBM' },


  { path: '/shipments/fba/new', component: CreateFBA, beforeEnter: notGuest },
  { path: '/shipments/fba/:sid', component: ReadFBA, beforeEnter: notGuest, name: 'viewFBA' },
  { path: '/shipments/fba/:sid/edit', component: UpdateFBA, beforeEnter: notGuest, name: 'updateFBA' },
  { path: '/shipments/fba/:sid/assist', component: AssistFBA, beforeEnter: isAssistant, name: 'assistFBA' },


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
    ? next()
    : next({ path: from })
}
