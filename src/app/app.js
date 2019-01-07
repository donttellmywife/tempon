import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes.js'

import './app.css'


Vue.use(VueRouter)
const router = new VueRouter({routes})
const app = ($root) => {
  new Vue({
    el: $root,
    router,
  })
}
export default app
