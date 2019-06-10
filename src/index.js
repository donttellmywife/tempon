import Vue from 'vue'
import Vuex from 'vuex'

import { router, store } from 'APP'
// import SvelteApp from './App.svelte'

import './theme/index.css';


const app = ($root) => {
  new Vue({
    el: $root,
    store,
    router,
    template: '<router-view class="view" />',
  })
}
export default app

app('#vueapp')

// const app2 = new SvelteApp({
//   target: document.svelteapp,
//   props: {
//     timetable: [],
//   },
// })
