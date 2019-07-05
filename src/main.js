// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import clickOutside from '@/directives/clickOutside'
require('@/utils/date')
Vue.config.productionTip = false

Vue.use(clickOutside)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
