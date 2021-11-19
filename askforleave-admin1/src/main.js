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
import autoHeight from './components/auto-height'

import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.prototype.$http = axios
Vue.config.productionTip = false
//axios.defaults.baseURL = 'http://gkd.aztop.cn:8000'
axios.defaults.baseURL = 'http://47.108.74.14/'
Vue.directive('auto-height', autoHeight)

Vue.use(ElementUI);
Vue.use(Vuex)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

window.addEventListener('resize', function(e) {
    //console.log(this.document.querySelector('.sihai').offsetHeight);
    //var height = this.document.querySelector('.sihai').offsetHeight;
    //this.document.querySelector('.sihai').firstChild.style.maxHeight = height+'px';
    //console.log(this.document.querySelector('.sihai').firstChild);
    //this.document.querySelector('.sihai').firstChild.setAttribute("max-height", 502); 
})