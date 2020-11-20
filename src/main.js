import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import env from '../static/settings-local'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$env = env

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})