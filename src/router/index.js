import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Pages/Home.vue'
import Creator from '@/components/Pages/Creator.vue'

Vue.use(VueRouter)


const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/create/:fileId', name: 'create', component: Creator },
]


export default new VueRouter({
    routes,
    mode: "history"
})


