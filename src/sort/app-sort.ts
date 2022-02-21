import { createApp } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import VueRouter, { RouteRecordRaw } from "vue-router";
import SortApp from './components/SortApp.vue'
import Sort from './components/Sort.vue'
import Menu from './components/Menu.vue'


const routes = [
    {
        path: '/sort',
        name: 'home',
        component: SortApp
    }
]

const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
})

router.beforeEach((to, from, next) => {
    if (!to.query.id) {
        next({ name: 'home', query: { id: 'BubbleSort' } })
    } else {
        next();
    }
})


const app = createApp(SortApp)
    .use(router)
    .component("Menu", Menu)
    .component("Sort", Sort)
    .mount('#app')
