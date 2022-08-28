import Vue from 'vue'
import App from './components'
import store from './store'
import '@/assets/styles/global.css'
import '@/assets/styles/variables.css'

Vue.config.productionTip = false

new Vue({
  store: store(),
  render: h => h(App)
}).$mount('weather-widget')
