<template>
    <div class="food-item">
      <!-- <img :src="item.image" :alt="item.name"> -->
      <h3>{{ item.name }}</h3>
      <!-- <p>${{ item.price }}</p> -->
      <!-- <button @click="$emit('add-to-cart', item)">Add to Cart</button> -->
    </div>
  </template>
  
  <script>
  export default {
    props: ['item'],
  };
  </script>
  
  <style scoped>
  /* Add styles for a food item */
  </style>