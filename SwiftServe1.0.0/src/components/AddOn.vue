<template>
    <div class="add-on-section">
      <h3>Add On</h3>
      <div v-for="addOn in addOns" :key="addOn.id" class="add-on-item">
        <span>{{ addOn.name }}</span>
        <span>${{ addOn.price }}</span>
        <div class="quantity-controls">
          <button @click="decreaseQuantity(addOn)">-</button>
          <span>{{ addOn.quantity }}</span>
          <button @click="increaseQuantity(addOn)">+</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['addOns'],
    methods: {
      increaseQuantity(addOn) {
        addOn.quantity++;
        this.$emit('updateAddOn', addOn);
      },
      decreaseQuantity(addOn) {
        if (addOn.quantity > 0) {
          addOn.quantity--;
          this.$emit('updateAddOn', addOn);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add-on-section {
    margin-top: 20px;
  }
  
  .add-on-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
  }
  
  .quantity-controls button {
    background-color: #00aaff;
    border: none;
    color: white;
    padding: 5px;
    cursor: pointer;
  }
  </style>