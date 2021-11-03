import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import forget from '../components/forget.vue'
import modify from '../components/modify.vue'
import home from '../components/home.vue'
import handle from '../components/handle.vue'
import approved from '../components/approved.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/forget', component: forget },
    { path: '/modify', component: modify },
    {
        path: '/home',
        component: home,
        // redirect: '/form',
        children: [
            { path: '/handle', component: handle },
            { path: '/approved', component: approved },   
        ]
    },
]

const router = new VueRouter({
  routes
})

export default router
