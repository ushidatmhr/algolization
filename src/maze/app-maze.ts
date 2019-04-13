import Vue from 'vue'
import VueRouter from "vue-router";
import MazeApp from './components/MazeApp.vue';
import Maze from './components/Maze.vue';

Vue.use(VueRouter);
Vue.component('Maze', Maze);

new Vue({
    el: '#app',
    render: h => h(MazeApp),
    router: new VueRouter()
});