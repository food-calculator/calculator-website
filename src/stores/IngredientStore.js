import {defineStore} from "pinia";
import {API} from "@/config.json"

export const useIngredientStore = defineStore("ingredients", {
    state: () => {
        return {
            ingredients: {}
        }
    }
})

export function fetchIngredients() {
    const ingredientStore = useIngredientStore()
    fetch(`${API}/ingredients/list`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            json.forEach(ingredient => {
                console.log(ingredient)
                ingredientStore.ingredients[ingredient["id"]] = ingredient
            })
        })
        .catch(error => {
            console.error(error)
        })
}