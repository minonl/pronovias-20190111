import Vue from 'vue'

import YDUI from 'vue-ydui' /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css'
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */

import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import VueTouch from 'vue-touch'

import { Settings } from 'luxon'

import '@/stylesheets/global.scss'

import App from './App.vue'
import store from './store'
import router from './router'

Vue.use(YDUI)
Vue.use(Datetime)
Vue.use(VueTouch, { name: 'v-touch' })

Settings.defaultLocale = 'zh-cn'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
