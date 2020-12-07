import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import env from '../static/settings-local'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VCalendar from 'v-calendar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/sass/paper-dashboard.scss'
import '@/assets/css/themify-icons.css'
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc'
})

Vue.component('calendar', Calendar)
Vue.component('date-picker', DatePicker)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$env = env
const token = store.state.token
console.log(token)
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token
}

new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')
