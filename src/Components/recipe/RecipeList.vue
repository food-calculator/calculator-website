<script lang="js">
import {defineComponent} from 'vue'
import {useRecipeStore} from "@/stores/RecipeStore.js";

const recipeStore = useRecipeStore()

export default defineComponent({
  name: "RecipeList",
  props: ["editorCaller"],
  data() {
    return {
      recipes: recipeStore.recipes
    }
  }
})
</script>

<template>
  <h2>Rezepte</h2>
  <br>
  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>min. Alter</th>
      <th>Zeit aufwand</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="recipe in this.recipes">
      <td>{{ recipe["name"] }}</td>
      <td>{{ recipe["minimumAge"] }}</td>
      <td>{{ recipe["timeExpenditure"] }}</td>
      <td class="editorCaller" @click="this.editorCaller(recipe['id'])">🖊️</td>
    </tr>
    </tbody>
  </table>
  <br>
  <button @click="this.editorCaller(-1)">Neues Rezept</button>
</template>

<style scoped>

@import "@/assets/views.css";

button {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.editorCaller {
  cursor: pointer;
}

.editorCaller:hover {
  color: transparent;
  text-shadow: 0 0 0 red;
}
</style>