import Vue from 'vue'
import Vuex from 'vuex'
// import { sync } from 'vuex-router-sync'

import router from './router.js'
import store from './store.js'

import './app.css'

// const unsync = sync(store, router)
const app = ($root) => {
  new Vue({
    el: $root,
    router,
    store,
    template: '<router-view class="view" />',
  })
}


export default app
