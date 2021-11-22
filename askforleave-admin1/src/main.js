import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import './assets/base.css'
import '../vue.config'
//import 'lib-flexible'
//import 'lib-flexible/flexible.js'

import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://47.108.74.14/'

Vue.use(ElementUI);
Vue.use(Vuex)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')