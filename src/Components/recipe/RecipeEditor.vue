<script lang="js">
import {defineComponent} from 'vue'
import {fetchRecipes} from "@/stores/RecipeStore.js";
import {useIngredientStore} from "@/stores/IngredientStore.js";
import {API} from "@/config.json"
import MCDialog from "@/Components/MultipleChoiceDialog.vue";

const ingredientStore = useIngredientStore()

export default defineComponent({
  name: "RecipeEditor",
  components: {MCDialog},
  props: ["recipeID", "listViewCaller"],
  data() {
    return {
      newRecipe: this.recipeID === -1,
      recipe: {
        id: -1,
        name: "",
        minimumAge: 0,
        timeExpenditure: "",
        portionSize: 10,
        description: "",
        ingredients: [],
        images: []
      },
      ingredients: ingredientStore.ingredients,
      newIngredientID: 0,
      deleteDialog: false,
    }
  },
  beforeMount() {
    if (this.recipeID === -1) return

    fetch(API + `/recipes/get?id=${btoa(this.recipeID)}`, {
      method: "GET",
      redirect: "follow"
    })
        .then(response => response.json())
        .then(json => {
          this.recipe = json
        })
        .catch(error => {
          console.error(error)
          alert(error)
        })

  }
  ,
  methods: {
    updateNewIngredientID(e) {
      this.newIngredientID = e.target.selectedOptions[0].getAttribute('data-ingredientID')
    }
    ,
    addIngredient() {
      this.recipe.ingredients.push({
        ingredientID: this.newIngredientID,
        quantity: 0
      })
    }
    ,
    removeIngredient(id) {
      console.log(id)
      console.log(JSON.stringify(this.recipe.ingredients))
      this.recipe.ingredients.splice(id, 1)
      console.log(JSON.stringify(this.recipe.ingredients))
    }
    ,
    save() {
      const body = JSON.stringify(this.recipe)
      console.log(body)
      if (this.newRecipe) {
        fetch(API + "/recipes/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: body,
          redirect: "follow"
        })
            .then(response => response.json())
            .then(json => {
              console.log(json)
              if (json["status"] === "SUCCESS") {
                fetchRecipes()
                this.listViewCaller()
              } else {
                alert(json["message"])
              }
            })
            .catch(error => {
              console.error(error)
              alert(error)
            })
      } else {
        fetch(API + "/recipes/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: body,
          redirect: "follow"
        })
            .then(response => response.json())
            .then(json => {
              console.log(json)
              if (json["status"] === "SUCCESS") {
                fetchRecipes()
                this.listViewCaller()
              } else {
                alert(json["message"])
              }
            })
            .catch(error => {
              console.error(error)
              alert(error)
            })
      }
    },
    removeRecipe(action) {
      console.log(action)
      if (action === "delete") {
        fetch(API + `/recipes/remove`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({id: this.recipeID}),
          redirect: "follow"
        })
            .then(response => response.json())
            .then(json => {
              if (json["status"] === "SUCCESS") {
                console.log("Recipe deleted: " + this.recipeID)
                fetchRecipes()
                this.listViewCaller()
              } else {
                alert(json["message"])
              }
            })
            .catch(error => {
              console.error(error)
              alert(error)
            })
      } else {
        this.deleteDialog = false
      }
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
        <input type="number" v-model="this.recipe.portionSize">
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
          <div v-for="(ingredient, index) in this.recipe.ingredients" class="ingredient">
            <span @click="this.removeIngredient(index)">🗑️</span>
            <p>{{ this.ingredients[ingredient["ingredientID"]]["name"] }},
              {{ this.ingredients[ingredient["ingredientID"]]["unit"] }}</p>
            <input type="number" v-model="ingredient.quantity">
          </div>
          <div class="ingredient">
            <label for="selectIngredient">Zutat: </label>
            <select name="selectIngredient"
                    v-on:change="this.updateNewIngredientID">
              <optgroup label="Erstellen">
                <option>Neue Zutat</option>
              </optgroup>
              <optgroup label="Zutaten">
                <option v-for="ingredient in this.ingredients" :data-ingredientID="ingredient.id">
                  {{ ingredient.name }}
                </option>
              </optgroup>
            </select>
            <input @click="this.addIngredient()" type="button" value="Hinzufügen">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="descriptionContainer">
    <p>Beschreibung</p>
    <textarea v-model="this.recipe.description" cols="40" rows="3"/>
  </div>
  <button id="save" @click="save">{{ this.newRecipe ? "Erstellen" : "Speichern" }}</button>
  <button v-if="!this.newRecipe" id="delete" @click="this.deleteDialog = true">Löschen</button>
  <MCDialog v-if="this.deleteDialog" message="Rezept Löschen"
            :options="[{display: 'Ja', submit: 'delete'}, {display: 'Nein', submit: 'keep'}]"
            :action="this.removeRecipe"/>
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
  font-size: 1.5em;
  line-height: 1em;
  cursor: pointer;
}

.ingredient span:hover {
  color: transparent;
  text-shadow: 0 0 0 red;
  font-size: 1.5em;
  line-height: 1em;
  cursor: pointer;
}

</style>