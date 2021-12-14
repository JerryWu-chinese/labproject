import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '../components/register.vue'
import login from '../components/login.vue'
import forget from '../components/forget.vue'
import modify from '../components/modify.vue'
import home from '../components/home.vue'
import information from '../components/information.vue'
import apply from '../components/apply.vue'
import state from '../components/state.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/register', component: register },
    { path: '/login', component: login },
    { path: '/forget', component: forget },
    { path: '/modify', component: modify },
    {
        path: '/home',
        component: home,
        // redirect: '/form',
        children: [
            { path: '/apply', component: apply },
            { path: '/state', component: state },   
            { path: '/information', component: information },
        ]
    },
]

const router = new VueRouter({
  routes
})

export default router
