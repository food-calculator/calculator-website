<script>
import {useIngredientStore} from "@/stores/IngredientStore.js";
import MCDialog from "@/Components/MultipleChoiceDialog.vue";
import {API} from "@/config.json"

let ingredientStore = useIngredientStore()

export default {
  components: {MCDialog},
  data() {
    return {
      ingredients: ingredientStore.ingredients,
      ingredientName: "",
      ingredientUnit: "",
      deleteDialog: false,
      deleteMessage: "",
      deleteID: ""
    }
  }, methods: {
    requestDelete(id) {
      this.deleteID = id
      this.deleteMessage = `Lösche Zutat "${ingredientStore.ingredients[id].name}"`
      this.deleteDialog = true
    },
    delete(id, option) {
      this.deleteDialog = false
      console.log(`Delete ${id}: ${option}`)
      if (option !== "delete") return;
      const urlEncoded = new URLSearchParams()
      urlEncoded.append("id", id)

      fetch(API + "/ingredients/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: urlEncoded,
        redirect: "follow"
      })
          .then((response) => response.json())
          .then((json) => {
            if (json["status"] === "SUCCESS") {
              delete ingredientStore.ingredients[this.deleteID]
            }
          })
    },
    submit() {
      const body = JSON.stringify({id: -1, name: this.ingredientName, unit: this.ingredientUnit})
      console.log(body)

      fetch(API + "/ingredients/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: body,
        redirect: "follow"
      })
          .then((response) => response.json())
          .then((json) => {
            console.log(json)
            if (json["status"] === "SUCCESS") {
              ingredientStore.ingredients[json["message"]["id"]] = json["message"]
              this.ingredientName = ""
              this.ingredientUnit = ""
            } else {
              alert(json["status"])
            }
          })
          .catch((error) => {
            console.error(error)
            alert(error)
          });
    }
  }
}
</script>

<template>
  <h2>Zutaten</h2>
  <br/>
  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Einheit</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="ingredient in this.ingredients">
      <td>{{ ingredient.name }}</td>
      <td>{{ ingredient.unit }}</td>
      <td class="deleteButton" @click="requestDelete(ingredient.id)">🗑️</td>
    </tr>
    <tr>
      <td><input type="text" placeholder="Name" v-model="ingredientName"></td>
      <td><input type="text" placeholder="Einheit" v-model="ingredientUnit"></td>
    </tr>
    </tbody>
  </table>
  <button @click="submit">Speichern</button>
  <MCDialog v-if="this.deleteDialog" :message="this.deleteMessage"
            :options="[{display: 'Ja', action: 'delete'}, {display: 'Nein', action: 'keep'}]"
            :forward-param="this.deleteID" :action="this.delete"/>
</template>

<style scoped>
@import "@/assets/views.css";

.deleteButton {
  border: none;
  visibility: hidden;
  background: var(--color-background);
  cursor: pointer;
}

.deleteButton:hover {
  color: transparent;
  text-shadow: 0 0 0 red;
}

tr:hover .deleteButton {
  visibility: visible;
}

button {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
