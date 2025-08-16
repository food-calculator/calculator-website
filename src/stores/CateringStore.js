import {defineStore} from "pinia";
import {API} from "@/config.json"

export const useCateringStore = defineStore("caterings", {
    state: () => {
        return {
            plans: {}
        }
    }
})

export function fetchCateringPlans() {
    const cateringStore = useCateringStore()
    cateringStore.plans = {}
    fetch(API + "/cateringPlans/list")
        .then(response => response.json())
        .then(json => {
            console.log(json)
            json.forEach(plan => cateringStore.plans[plan.id] = plan)
        })
        .catch(error => {
            console.log(error)
        })
}