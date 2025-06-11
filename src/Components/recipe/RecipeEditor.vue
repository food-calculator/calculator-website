<script lang="js">
import {defineComponent} from 'vue'
import {useRecipeStore} from "@/stores/RecipeStore.js";
import {useIngredientStore} from "@/stores/IngredientStore.js";

const recipeStore = useRecipeStore()
const ingredientStore = useIngredientStore()

export default defineComponent({
  name: "RecipeEditor",
  props: ["recipeID"],
  data() {
    return {
      newRecipe: this.recipeID === -1,
      recipe: this.recipeID === -1 ? {
        name: "",
        minimumAge: 0,
        timeExpenditure: "",
        portions: 10,
        description: "",
        ingredients: [],
        images: []
      } : recipeStore.recipes[this.recipeID],
      ingredients: ingredientStore.ingredients,
    }
  },
  methods: {
    save() {

    }
  }
})
</script>

<template>
  <h2>Rezept Editor</h2>
  <br>
  <div id="formular">
    <div class="inputContainer">
      <p>Name</p>
      <input type="text" v-model="this.recipe.name">
    </div>
    <div id="metadata">
      <div class="inputContainer">
        <p>Mindestalter</p>
        <input type="number" v-model="this.recipe.minimumAge">
      </div>
      <div class="inputContainer">
        <p>Zeitaufwand</p>
        <input type="text" v-model="this.recipe.timeExpenditure">
      </div>
      <div class="inputContainer">
        <p>Portionsgröße</p>
        <input type="number" v-model="this.recipe.portions">
      </div>
    </div>
    <div>
      <div class="inputContainer">
        <p>Bilder</p>
        <p><b>TODO</b></p>
      </div>
      <div class="inputContainer">
        <p>Zutaten</p>
        <p><b>TODO</b></p>
      </div>
    </div>
  </div>
  <div id="descriptionContainer">
    <p>Beschreibung</p>
    <textarea cols="40" rows="3"/>
  </div>
  <button @click="save">Speichern</button>
</template>

<style scoped>
h2 {
  text-align: center;
}

#formular, #descriptionContainer {
  margin: auto;
  width: max-content;
}

button {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 30px;
}

#descriptionContainer p {
  font-weight: bold;
  text-align: center;
  margin: 5px 0
}

div:has(.inputContainer) {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.inputContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 30px;
}
</style>