<template>
  <div class="cart-container">
    <h2>Order Cart</h2>
    <div class="cart">
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }} - ${{ item.price }}
          <button @click="$emit('remove-item', item.id)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    props: ['items']
  };
  </script>
  
  <style scoped>

  .cart-container {
    display: flex;
    flex-direction: column; /* Stack the header and cart vertically */
  }

  .cart {
  border: 1px solid #00A895;
  padding: 10px;
  margin-top: 20px;
  }

  .cart ul {
    list-style: none;
    padding: 0;
  }

  .cart li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:  
  5px;
  }
  </style>