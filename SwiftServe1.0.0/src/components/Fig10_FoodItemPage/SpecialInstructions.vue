<template>
    <div class="special-instructions-section">
      <h3>Special Instructions</h3>
      <textarea v-model="instructions" placeholder="Add any special requests"></textarea>
    </div>
  </template>
  
  <script>
  export default {
    props: ['value'],
    computed: {
      instructions: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .special-instructions-section {
    margin-top: 20px;
  }
  
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #00A985;
  }
  </style>
  