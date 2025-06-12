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
    addIngredient(id) {

    },
    removeIngredient(id) {

    },
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
      <div class="inputContainer" id="ingredientContainer">
        <p>Zutaten</p>
        <div id="ingredientList">
          <div v-for="ingredient in this.recipe.ingredients" class="ingredient">
            <span>❌</span>
            <p>{{ ingredient.name }}, {{ this.ingredients[ingredient["ingredientID"]]["unit"] }}</p>
            <input type="number">
          </div>
          <div class="ingredient">
            <label for="selectIngredient">Zutat: </label>
            <select name="selectIngredient">
              <optgroup label="Erstellen">
                <option>Neue Zutat</option>
              </optgroup>
              <optgroup label="Zutaten">
                <option v-for="ingredient in this.ingredients">{{ ingredient.name }}</option>
              </optgroup>
            </select>
            <input type="button" value="Hinzufügen">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="descriptionContainer">
    <p>Beschreibung</p>
    <textarea cols="40" rows="3"/>
  </div>
  <button id="save" @click="save">Speichern</button>
</template>

<style scoped>
h2 {
  text-align: center;
}

#formular, #descriptionContainer {
  margin: auto;
  width: max-content;
}

#save {
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
  max-width: 100%;
  gap: 30px;
}

#ingredientContainer {
  flex-direction: column;
  gap: 10px;
  border: 1px solid var(--color-border);
  padding: 10px;
  border-radius: 10px;
}

#ingredientList {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
}

.ingredient {
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}

.ingredient span {
  color: red;
  font-size: 1.5em;
  line-height: 1em;
  cursor: pointer;
}


</style>