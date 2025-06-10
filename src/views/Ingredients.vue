<script>
import {useIngredientStore} from "@/stores/IngredientStore.js";

let ingredientStore = useIngredientStore()

export default {
  data() {
    return {
      ingredients: ingredientStore.ingredients,
      ingredientName: "",
      ingredientUnit: ""
    }
  }, methods: {
    submit() {
      const body = JSON.stringify({id: -1, name: this.ingredientName, unit: this.ingredientUnit})
      console.log(body)

      fetch("https://calc.bitea.de/api/ingredients/add", {
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
    </tr>
    <tr>
      <td><input type="text" placeholder="Name" v-model="ingredientName"></td>
      <td><input type="text" placeholder="Einheit" v-model="ingredientUnit"></td>
    </tr>
    </tbody>
  </table>
  <button @click="submit">Speichern</button>
</template>

<style scoped>
h2 {
  text-align: center;
}

table {
  margin: auto;
  border-collapse: collapse;
}

th {
  border-bottom: 2px solid var(--color-border);
  text-align: center;
}

td {
  border-bottom: 1px solid var(--color-border);
  text-align: center;
}

td:first-child, th:first-child {
  padding-left: 5px;
}

td:last-child, th:last-child {
  padding-right: 5px;
}

tbody tr:hover {
  background: var(--color-background-soft);
}

tr:last-child td {
  border: none
}

input, button {
  background: var(--color-background);
  color: var(--color-text);
  border-color: var(--color-border);
}

button {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

input:hover, button:hover {
  border-color: var(--color-border-hover);
}
</style>
