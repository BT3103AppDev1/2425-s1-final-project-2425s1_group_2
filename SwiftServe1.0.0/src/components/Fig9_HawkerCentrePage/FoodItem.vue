<template>
    <div class="food-item">
      <!-- <img :src="item.image" :alt="item.name"> -->
      <h3>{{ item.foodItemName }}</h3>
      <!-- <p>${{ item.price }}</p> -->
    </div>
  </template>
  
  <script>
  export default {
    props: ['item'],
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
  </style>