import Vue from 'vue'
import VueRouter from "vue-router";
import SortApp from './SortApp.vue'
import Sort from './Sort.vue'
import Menu from './Menu.vue'

Vue.use(VueRouter);

Vue.component('Sort', Sort);
Vue.component('Menu', Menu);


new Vue({
    el: '#app',
    render: h => h(SortApp),
    router: new VueRouter()
});