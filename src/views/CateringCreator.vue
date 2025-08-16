<script>
import {API} from "@/config.json"
import {useCateringStore} from "@/stores/CateringStore.js";

const cateringStore = useCateringStore()
export default {
  name: "CateringCreator",
  data() {
    return {
      name: "",
      start: "",
      end: "",
      personCount: ""
    }
  },
  methods: {
    create() {
      fetch(API + "/cateringPlans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: -1,
          name: this.name,
          dateStart: this.start,
          dateEnd: this.end,
          defaultPersonCount: this.personCount
        }),
        redirect: "follow"
      })
          .then(response => response.json())
          .then(json => {
            if (json["status"] === "SUCCESS") {
              cateringStore[json["message"]["id"]] = json["message"]
              this.$router.push(`/plans/editor?id=${json["message"]["id"]}`)
            } else {
              alert(json["status"])
              console.log(json)
            }
          })
          .catch(error => {
            console.log(error)
            alert(error)
          })
      this.$router.push("/plans/edit")
    },
    cancel() {
      this.$router.push("/plans")
    }
  }
}
</script>

<template>
  <h2>Neuer Plan</h2>
  <br/>
  <div id="formula">
    <div class="inputContainer">
      <p>Name</p>
      <input type="text" v-model="name">
    </div>
    <div class="inputContainer">
      <p>Start</p>
      <input type="date" v-model="start">
    </div>
    <div class="inputContainer">
      <p>Ende</p>
      <input type="date" v-model="end">
    </div>
    <div class="inputContainer">
      <p>Personenanzahl</p>
      <input type="number" v-model="personCount">
    </div>
    <div class="inputContainer">
      <button @click="this.create">Erstellen</button>
      <button @click="this.cancel">Abbrechen</button>
    </div>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
}

#formula {
  margin: auto;
  width: max-content;
  display: flex;
  flex-direction: column;
  gap: 10px
}

.inputContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
}
</style>