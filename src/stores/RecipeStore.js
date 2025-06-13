import {defineStore} from "pinia";
import {API} from "@/config.json"

export const useRecipeStore = defineStore("recipes", {
    state: () => {
        return {
            recipes: {}
        }
    }
})

export function fetchRecipes() {
    const recipeStore = useRecipeStore()
    recipeStore.recipes = {}
    recipeStore.recipes = {}
    fetch(`${API}/recipes/list`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            json.forEach(ingredient => {
                console.log(ingredient)
                recipeStore.recipes[ingredient["id"]] = ingredient
            })
        })
        .catch(error => {
            console.error(error)
        })
}