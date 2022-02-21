import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";
import MazeApp from './components/MazeApp.vue';
import Maze from './components/Maze.vue';
import Menu from './components/Menu.vue';

const routes = [
    {
        path: '/maze',
        name: 'home',
        component: MazeApp
    }
]

const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
})

router.beforeEach((to, from, next) => {
    if (!to.query.id) {
        next({ name: 'home', query: { id: 'StickDown' } })
    } else {
        next();
    }
})

const app = createApp(MazeApp)
    .use(router)
    .component("Menu", Menu)
    .component("Maze", Maze)
    .mount('#app')
