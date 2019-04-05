import Vue from 'vue'
import SortApp from './SortApp.vue'
import Sort from './Sort.vue'
import Menu from './Menu.vue'

Vue.component('Sort', Sort);
Vue.component('Menu', Menu);

new Vue({
    el: '#app',
    render: h => h(SortApp)
});