import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: () => import('./views/Home.vue')
        },
        {
            path: "/login",
            component: () => import('./views/Login.vue')
        },
        {
            path: "/ingredients",
            component: () => import('./views/Ingredients.vue')
        },
        {
            path: "/recipes",
            component: () => import('./views/Recipes.vue')
        },
        {
            path: "/plans",
            component: () => import('./views/Plans.vue')
        }
    ]
})

createApp(App).use(router).mount('#app')
