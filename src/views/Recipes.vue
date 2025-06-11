<script lang="js">
import {defineComponent} from 'vue'
import RecipeList from "@/Components/recipe/RecipeList.vue";
import RecipeEditor from "@/Components/recipe/RecipeEditor.vue";

export default defineComponent({
  name: "Recipes",
  components: {RecipeEditor, RecipeList},
  data() {
    return {
      editor: false,
      recipeID: 0
    }
  },
  methods: {
    callEditor(recipeID) {
      this.recipeID = recipeID
      this.editor = true
    }
  }
})
</script>

<template>
  <RecipeList v-if="!this.editor" :editor-caller="this.callEditor"/>
  <RecipeEditor v-if="editor" :recipeID="this.recipeID"/>
</template>

<style scoped></style>