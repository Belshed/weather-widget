import Vue from 'vue'
import App from './components'
import store from './store'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'

import '@/assets/styles/global.css'
import '@/assets/styles/variables.css'

Vue.config.productionTip = false

Vue.use(Vuetify)

const vuetify = new Vuetify()

new Vue({
  vuetify,
  store: store(),
  render: h => h(App)
}).$mount('weather-widget')
