import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast/index'
// import VueLazyload from 'vue-lazyload'

import FastClick from "fastclick"

Vue.config.productionTip = false

Vue.use(toast)
// Vue.use(VueLazyload)

Vue.prototype.$bus = new Vue()

// 解决移动端300ms的问题
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
