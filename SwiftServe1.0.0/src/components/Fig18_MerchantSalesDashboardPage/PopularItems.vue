<template>
    <div class="popular-items">
      <h3>Most Popular Food Items</h3>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ index + 1 }}. {{ item }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "PopularItems",
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .popular-items {
    background-color: #00adb5;
    padding: 20px;
    color: white;
    font-size: 1rem;
  }
  </style>
  