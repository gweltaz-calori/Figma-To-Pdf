import App from '@/App.vue';

import Vue from 'vue';
import router from './router/index'
import store from './store/index'

import WS from '@/js/utils/ws'

WS.init()

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});