import Vue from 'vue'
import Vuex from 'vuex'

import { router, store } from 'APP'

import './app.css'


const app = ($root) => {
  new Vue({
    el: $root,
    store,
    router,
    template: '<router-view class="view" />',
  })
}
export default app
