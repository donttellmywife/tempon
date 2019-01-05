import * as fontAwesome from 'font-awesome/css/font-awesome.css';
import Vue from 'vue';
import styles from './index.scss';
import App from './app/App.vue';

const app = new Vue({
  el: '#vueapp',
  render: h => h(App),
})

console.log(app)
