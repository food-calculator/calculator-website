<script>
export default {
  props: ["message", "options", "action", "forwardParam"],
  name: "MC-Dialog"
}
</script>

<template>
  <div id="popupContainer">
    <div id="popup">
      <h3>{{ this.message }}</h3>
      <br />
      <div id="buttons">
        <button v-for="option in this.options" @click="this.action(this.forwardParam, option.action)">{{ option.display }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#popupContainer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
}

#popup {
  width: max-content;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2em;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  box-shadow: 5px 5px var(--color-background-soft);
  border-radius: 20px;
}

#buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 0.5em;
}

h1 {
  text-align: center;
}
</style>