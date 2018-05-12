import App from '@/App.vue';

import Vue from 'vue';
import router from './router/index'
import store from './store/index'

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});