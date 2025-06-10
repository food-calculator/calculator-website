import {defineStore} from "pinia";
import {ref} from "vue";
import {API} from "@/config.json"

export const useRecipeStore = defineStore("recipes", () => {
    const recipes = ref([])
})

export function fetchRecipes() {
    fetch(`${API}/recipes/list`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
        })
        .catch(error => {
            console.error(error)
        })
}