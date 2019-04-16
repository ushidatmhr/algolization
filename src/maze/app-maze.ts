import Vue from 'vue'
import VueRouter from "vue-router";
import MazeApp from './components/MazeApp.vue';
import Maze from './components/Maze.vue';
import Menu from './components/Menu.vue';

Vue.use(VueRouter);
Vue.component('Maze', Maze);
Vue.component('Menu', Menu);

new Vue({
    el: '#app',
    render: h => h(MazeApp),
    router: new VueRouter()
});