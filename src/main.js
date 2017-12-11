// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios';
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'babel-polyfill'
import $ from 'jquery'

import {xhr} from 'assets/js/api'
Vue.prototype.$xhr = xhr

Vue.use(ElementUI);

Vue.config.productionTip = false
// Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
import './assets/css/index.sass'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
