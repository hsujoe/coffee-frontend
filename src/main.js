// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/store'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import JQuery from 'jquery'
import VueSlideBar from 'vue-slide-bar'
import VueSweetalert2 from 'vue-sweetalert2'
import VueGoodWizard from 'vue-good-wizard'
import axios from 'axios'
import qs from 'qs'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
// import i18n from './i18n'

import Cookies from 'js-cookie'
// import VueSession from 'vue-session'

const token = Cookies.get('token')
// eslint-disable-next-line
let $ = JQuery

Vue.prototype.$qs = qs
axios.defaults.baseURL = 'http://localhost:9000'
// axios.defaults.headers.common.Authorization = 'Bearer ' + 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb29sY2F0Iiwic3ViIjoibG9naW4iLCJleHAiOjE1OTY2Nzk0ODQsIm5iZiI6MTU5NjA3NjQ4NCwiaWF0IjoxNTk2MDc0Njg0LCJqdGkiOiI2MTk3YmE4YS0xMTA1LTRkYzktYjNlMy1iNzhiMzUzNDg0ZDgiLCJpZCI6MCwidXNlcm5hbWUiOiJ0ZXN0IiwicGFzc3dvcmQiOiIifQ.Yw6Zhtl2bSj5Dt4Bs2QCSETYFnqCqgqmxaQhUCRgPfwLd3drCRuw2XUY7VZmlN7LZuehhPlj1IKjGJQM5l2TRg'

axios.defaults.headers.common.Authorization = 'Bearer ' + token

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2, options)
Vue.use(VueGoodWizard)
Vue.use(Vuex)
Vue.use(axios)
Vue.use(qs)
// Vue.use(VueSession, { persist: true })
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
Viewer.setDefaults({
  zIndexInline: 2017
})
// Vue.use(Viewer)
// Viewer.setDefaults({
//   Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
// })
// Vue.use(i18n)
// Vue.use(store)
Vue.component('vue-slide-bar', VueSlideBar)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
