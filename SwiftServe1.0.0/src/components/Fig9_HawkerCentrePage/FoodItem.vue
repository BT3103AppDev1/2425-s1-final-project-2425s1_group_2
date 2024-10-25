<template>
      <!-- <img :src="item.image" :alt="item.name"> -->
      <div :class="['food-item', { 'unavailable': !item.available }]"
      @click="handleClick">

      <h3>{{ item.foodItemName }}</h3>
      <!-- <p>${{ item.price }}</p> -->
      </div>
  </template>
  
  <script>
  export default {
    props: ['item'],
    methods: {
      handleClick() {
        if (this.item.available) {
          this.$emit('click', this.item);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .food-item {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.food-item img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.food-item.unavailable {
  background-color: grey;
  opacity: 0.5;
  cursor: not-allowed;
}
  </style>