<script>

import {useRecipeStore} from "@/stores/RecipeStore.js";

const recipeStore = useRecipeStore()

export default {
  name: "SideFormula",
  props: ["hideSidebar", "saveFkt", "defaultPersonCount", "assignedRecipes", "mealSlot"],
  data() {
    return {
      recipes: recipeStore.recipes,
      recipeCount: 1,
      selectedRecipes: [{personCount: this.defaultPersonCount, recipe: null}],
    }
  },
  methods: {
    updateSelectedRecipe(e) {
      const recipeID = e.target.selectedOptions[0].getAttribute('data-recipeID')
      const i = e.target.selectedOptions[0].getAttribute('data-nth-recipe')
      console.log(recipeID)
      console.log(i)
      this.selectedRecipes[i]["recipe"] = recipeID
    },
    save() {
      while(this.selectedRecipes[this.recipeCount] != null) {
        this.selectedRecipes.splice(this.recipes, 1)
      }
      this.hideSidebar()
      this.saveFkt(this.selectedRecipes)
    }
  },
  beforeUpdate() {
    for (let i = 0; i < this.recipeCount; i++) {
      if (this.selectedRecipes[i] == null) {
        this.selectedRecipes[i] = {
          personCount: this.defaultPersonCount,
          recipeID: null
        }
      }
    }
  }
}
</script>

<template>
  <div id="container">
    <div id="clickArea" @click="this.hideSidebar"/>
    <div id="formulaContainer">
      <h3>Rezept auswählen</h3>
      <div class="inputContainer">
        <p>Rezeptanzahl</p>
        <input type="number" v-model="this.recipeCount">
      </div>
      <div class="inputContainer" id="buttonContainer">
        <button @click="this.save()">Speichern</button>
        <button @click="this.hideSidebar">Abbrechen</button>
      </div>
      <div v-for="i in this.recipeCount" class="formula">
        <h4>Rezept {{ i }}</h4>
        <div class="inputContainer">
          <p>Rezept</p>
          <select v-on:change="this.updateSelectedRecipe" name="Rezept auswählen">
            <option>- Rezept auswählen -</option>
            <option v-for="recipe in this.recipes" :data-recipeID="recipe.id" :data-nth-recipe="i - 1">
              {{ recipe.name }}
            </option>
          </select>
        </div>
        <div class="inputContainer">
          <p>Persohnenanzahl</p>
          <input type="number" v-model="this.selectedRecipes[i - 1]['personCount']">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3, h4 {
  text-align: center;
}

.inputContainer {
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: space-between;
}

.formula {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#formulaContainer {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: max-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

#clickArea {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
}

#buttonContainer {
  justify-content: space-evenly;
}
</style>