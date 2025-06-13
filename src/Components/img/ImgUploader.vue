<script lang="js">
import {defineComponent} from 'vue'
import {API} from "@/config.json"

let file = null

export default defineComponent({
  name: "ImgUploader",
  props: ["uploadPath", "callback"],
  data() {
    return {
      uploadReady: false,
    }
  },
  methods: {
    onChange(event) {
      file = event.target.files[0]
      this.uploadReady = true
    },
    async upload() {
      console.log("Upload...")
      const reader = new FileReader()
      reader.onload = (event) => {
        const contentType = file.type
        console.log(contentType)
        fetch(API + this.uploadPath, {
          method: "POST",
          headers: {
            "Content-Type": contentType,
          },
          body: event.target.result,
          redirect: "follow"
        })
            .then(response => response.json())
            .then(json => {
              this.$refs.input_file.value = null
              console.log(json)
              if (json["status"] === "SUCCESS") {
                this.callback(json["message"]["id"])
              } else {
                alert(json["message"])
              }
            })
      }
      reader.onerror = () => {
        alert("Error while trying to read the file")
      }
      reader.readAsArrayBuffer(file)
    }
  }
})
</script>

<template>
  <div>
    <input ref="input_file" @change="this.onChange" type="file" accept="image/png, image/jpeg">
    <button @click="this.upload" :disabled="!this.uploadReady">Upload Image</button>
  </div>
</template>

<style scoped>
div {
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  width: max-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>