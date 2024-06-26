import Vue from 'vue'
import { PiniaVuePlugin, createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

Vue.use(PiniaVuePlugin)

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app')
