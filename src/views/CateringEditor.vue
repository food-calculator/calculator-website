<script>
import {API} from "@/config.json"
import SideFormular from "@/Components/planning/SideFormula.vue";
import {useRecipeStore} from "@/stores/RecipeStore.js";

const recipeStore = useRecipeStore()

export default {
  name: "CateringEditor",
  components: {SideFormula: SideFormular},
  data() {
    return {
      recipes: recipeStore.recipes,
      plan: {},
      days: 0,
      newMealSlot: {
        id: -1,
        cateringPlan: this.id(),
        name: "",
        time: "",
        defaultPersonCount: ""
      },
      sideFormulaInfo: {
        showSidebar: false,
        assignedRecipes: [],
        slot: -1,
        day: -1,
      }
    }
  },
  methods: {
    dateToStr(date) {
      let res = "";
      res += date.getFullYear();
      res += "-";
      res += (date.getMonth() + 1).toString().padStart(2, "0");  // Add 1 to the month and pad it
      res += "-";
      res += date.getDate().toString().padStart(2, "0");  // Use getDate() for the day of the month
      return res;
    },
    getDayNumberOfDate(dateStr) {
      const start = new Date(this.plan.dateStart)
      const date = new Date(dateStr)
      const delta = date - start
      return delta / (1000 * 60 * 60 * 24)
    },
    async saveAssignedRecipe(data) {
      console.log(data)
      const date = new Date(this.plan.dateStart)
      date.setDate(date.getDate() + this.sideFormulaInfo.day - 1)
      data.map(it => {
        it["date"] = this.dateToStr(date)
      })
      console.log(data[0]["date"])
      const mealSlot = this.plan["mealSlots"][this.sideFormulaInfo.slot]
      //["assignedRecipes"] = data
      const deleteRecipes = JSON.stringify(this.sideFormulaInfo.assignedRecipes.map(r => r.recipe))
      console.log(deleteRecipes)
      await fetch(API + "/assignedRecipe/list", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: deleteRecipes,
        redirect: "follow"
      })
          .then(response => response.json())
          .then(json => {
            if (json["status"] === "SUCCESS") {
              const toDeleteRecipeIDs = this.sideFormulaInfo.assignedRecipes.map(r => r.recipe)
              this.plan["mealSlots"].forEach(slot => {
                slot.assignedRecipes.filter(r => !toDeleteRecipeIDs.includes(r))
              })
            } else {
              console.log(json)
              alert(json["message"])
            }
          })
          .catch(error => {
            console.log(error)
            alert(error)
          })

      const newRecipes = JSON.stringify(data.map(d => {
        d["mealSlot"] = mealSlot.id
        return d
      }))
      console.log(newRecipes)
      await fetch(API + "/assignedRecipe/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: newRecipes,
        redirect: "follow"
      })

    },
    checkDate(baseDateStr, daysAdd, compareDateStr) {
      const baseDate = new Date(baseDateStr)
      const compareDate = new Date(compareDateStr)
      baseDate.setDate(baseDate.getDate() + daysAdd)
      return baseDate.getTime() === compareDate.getTime()
    },
    editMeal(slot, day) {
      this.sideFormulaInfo.day = day
      this.sideFormulaInfo.slot = slot
      this.sideFormulaInfo.assignedRecipes = this.plan["mealSlots"][slot]["assignedRecipes"].filter(assignedRecipe => this.checkDate(this.plan["dateStart"], day, assignedRecipe["date"]))
      console.log(this.sideFormulaInfo.assignedRecipes)
      this.sideFormulaInfo.showSidebar = true
    },
    addMealSlot() {
      const body = JSON.stringify(this.newMealSlot)
      console.log(body)
      fetch(API + "/mealSlots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: body,
        redirect: "follow"
      })
          .then(response => response.json())
          .then(json => {
            if (json["status"] === "SUCCESS") {
              this.plan.mealSlots.push(json["message"])
            } else {
              alert(json["status"])
              console.log(json)
            }
          })
          .catch(error => {
            console.log(error)
          })
      this.newMealSlot.name = ""
      this.newMealSlot.time = ""
      this.newMealSlot.defaultPersonCount = this.plan.defaultPersonCount
    },
    id() {
      return this.$route.query.id
    },
    getAssignedRecipes(slot, day) {
      let assignedRecipes = this.plan["mealSlots"][slot]["assignedRecipes"]
          .filter(r => this.checkDate(day, this.plan.dateStart, r));
      console.log("Länge " + assignedRecipes.length)
      return assignedRecipes
    }
  },
  async beforeMount() {
    const json = await fetch(API + `/cateringPlans?id=${this.id()}`).then(response => response.json())
    if (json["status"] === "SUCCESS") {
      const plan = json["message"]
      const start = new Date(plan.dateStart)
      const end = new Date(plan.dateEnd)
      start.setHours(0, 0, 0, 0)
      end.setHours(0, 0, 0, 0)
      const delta = end - start
      let days = delta / (1000 * 60 * 60 * 24) + 1;
      console.log("Tage: " + days)
      this.days = days
      this.plan = plan
      this.newMealSlot.defaultPersonCount = this.plan.defaultPersonCount
    } else {
      alert(json["status"])
      console.log(json)
    }
  }
}
</script>

<template>
  <h2>Plan bearbeiten</h2>
  <br/>
  <div id="metaInfoContainer">
    <div class="metaInfo">
      <p>Name</p>
      <p>{{ this.plan.name }}</p>
    </div>
    <div class="metaInfo">
      <p>Start</p>
      <p>{{ this.plan.dateStart }}</p>
    </div>
    <div class="metaInfo">
      <p>Ende</p>
      <p>{{ this.plan.dateEnd }}</p>
    </div>
    <div class="metaInfo">
      <p>Personenanzahl</p>
      <p>{{ this.plan.defaultPersonCount }}</p>
    </div>
  </div>
  <br/>
  <div v-if="this.plan.mealSlots != null" id="MealPlanContainer"
       :style="{gridTemplateColumns: `repeat(${this.days + 1}, 1fr)`, gridTemplateRows: `repeat(${this.plan.mealSlots.length + 1}, 1fr)`}">
    <div style="grid-column: 0">
      <p><b>Mahlzeit</b></p>
    </div>
    <div v-for="n in this.days" :style="{gridColumn: n + 1}">
      <p><b>Tag {{ n }}</b></p>
      <p>{{ new Date(new Date().setDate(new Date(plan.dateStart).getDate() + n - 1)).toLocaleDateString() }}</p>
    </div>
    <div v-for="(slot, index) in this.plan.mealSlots" :style="{gridColumn: 0, gridRow: index + 2}">
      <p><b>{{ slot.name }}</b></p>
      <p>Zeit: {{ slot.time }}</p>
      <p>{{ slot.defaultPersonCount }} Personen</p>
    </div>
    <template v-for="(slot, slotIndex) in this.plan.mealSlots">
      <div v-for="day in this.days" @click="this.editMeal(slotIndex, day)"
           :style="{gridRow: slotIndex + 2, gridColumn: day + 1}">
        <p>{{ slot.name }} {{ day }}</p>
        <p>{{ slotIndex }}, {{ day }}</p>
        <p v-for="assignedRecipe in this.getAssignedRecipes(slotIndex, day - 1)">
          {{ this.recipes[assignedRecipe.recipe].name }}
        </p>
      </div>
    </template>
  </div>
  <br/>
  <div id="newMealSlotContainer">
    <h4>Neue Mahlzeit</h4>
    <div class="inputContainer">
      <p>Name</p>
      <input type="text" v-model="newMealSlot.name" placeholder="Mittagessen">
    </div>
    <div class="inputContainer">
      <p>Uhrzeit</p>
      <input type="time" v-model="newMealSlot.time">
    </div>
    <div class="inputContainer">
      <p>Personenanzahl</p>
      <input type="number" v-model="newMealSlot.defaultPersonCount">
    </div>
    <button @click="this.addMealSlot">Hinzufügen</button>
  </div>
  <SideFormula v-if="this.sideFormulaInfo.showSidebar" default-person-count="42"
               :hide-sidebar="() => {this.sideFormulaInfo.showSidebar = false}"
               :save-fkt="this.saveAssignedRecipe" :assigned-recipes="this.sideFormulaInfo.assignedRecipes"/>
</template>

<style scoped>
h2, h4 {
  text-align: center;
}

#MealPlanContainer {
  display: grid;
  row-gap: 5px;
  column-gap: 5px;
}

#metaInfoContainer {
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-evenly;
}

.metaInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 30px;
  padding: 2px 5px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
}

#newMealSlotContainer {
  margin: auto;
  width: max-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 7px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
}

.inputContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
}
</style>