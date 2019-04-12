import Vue from 'vue'
import VueRouter from "vue-router";
import SortApp from './components/SortApp.vue'
import Sort from './components/Sort.vue'
import Menu from './components/Menu.vue'

Vue.use(VueRouter);

Vue.component('Sort', Sort);
Vue.component('Menu', Menu);


new Vue({
    el: '#app',
    render: h => h(SortApp),
    router: new VueRouter()
});