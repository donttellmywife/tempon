import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.use(VueRouter)

// import './app.css'

const router = new VueRouter({
  mode: 'history',
  routes,
})

const app = ($root) => {
  new Vue({
    el: $root,
    router,
    template: `
      <div id="app">
        <h1>Basic</h1>
        <ul>
          <li><router-link to="/">/</router-link></li>
          <li><router-link to="/foo">/foo</router-link></li>
          <li><router-link to="/bar">/bar</router-link></li>
          <router-link tag="li" to="/bar" :event="['mousedown', 'touchstart']">
            <a>/bar</a>
          </router-link>
          <li><router-link to="/é">/é</router-link></li>
        </ul>
        <router-view class="view"></router-view>
      </div>`,
  })
}
export default app
