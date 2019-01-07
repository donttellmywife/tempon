import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import './app.css'


Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  routes,
})


const app = ($root) => {
  new Vue({
    el: $root,
    router,
    template: '<router-view class="view" />',
  })
}


export default app
