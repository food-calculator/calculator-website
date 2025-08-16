<script>
import {useCateringStore} from "@/stores/CateringStore.js";

const cateringStore = useCateringStore()
export default {
  name: "CateringList",
  data() {
    return {
      "plans": cateringStore.plans
    }
  },
  methods: {
    editorCaller(id) {
      console.log(id)
    },
    createPlan() {
      this.$router.push("/plans/create")
    }
  }
}
</script>

<template>
  <h2>Kalkulationen</h2>
  <br/>
  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Von</th>
      <th>Bis</th>
      <th>Persohnenzahl</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="plan in this.plans">
      <td>{{plan["name"]}}</td>
      <td>{{plan["dateStart"]}}</td>
      <td>{{plan["dateEnd"]}}</td>
      <td>{{ plan["defaultPersonCount"]}}</td>
      <td class="editorCaller" @click="this.editorCaller(plan['id'])">🖊️</td>
    </tr>
    </tbody>
  </table>
  <br />
  <button @click="this.createPlan">Neuer Plan</button>
</template>

<style scoped>
@import "@/assets/views.css";

.editorCaller {
  cursor: pointer;
}

.editorCaller:hover {
  color: transparent;
  text-shadow: 0 0 0 red;
}

button {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

table {
  border-spacing: 5px 0;
}
</style>