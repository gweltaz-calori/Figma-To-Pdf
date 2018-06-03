import App from '@/App.vue';

import Vue from 'vue';
import router from './router/index'
import store from './store/index'
import VueMuuri from "vue-muuri";


Vue.use(VueMuuri);


import WebSocketManager from '@/js/utils/ws'

WebSocketManager.init()

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});