<template>
  <div class="special-instructions-section">
    <h2>Special Instructions</h2>
    <textarea v-model="instructions" placeholder="Add any special requests"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  computed: {
    instructions: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  }
}
</script>

<style scoped>
.special-instructions-section {
  margin-top: 20px;
}

textarea {
  width: 95%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #00adb5;
}
</style>
