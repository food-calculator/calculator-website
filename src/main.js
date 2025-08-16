import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router";
import {fetchIngredients} from "@/stores/IngredientStore.js";
import {createPinia} from "pinia";
import {fetchRecipes} from "@/stores/RecipeStore.js";
import {fetchCateringPlans} from "@/stores/CateringStore.js";

const pinia = createPinia()

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
            component: () => import("./views/CateringList.vue")
        },
        {
            path: "/plans/edit",
            component: () => import("./views/CateringEditor.vue")
        },
        {
            path: "/plans/create",
            component: () => import("./views/CateringCreator.vue")
        }
    ]
})

createApp(App).use(router).use(pinia).mount('#app')

fetchIngredients()
fetchRecipes()
fetchCateringPlans()