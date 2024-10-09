<template>
    <div class="cart">
      <h2>Order Cart</h2>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }} - ${{ item.price }}
          <button @click="$emit('remove-item', item.id)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['items']
  };
  </script>
  
  <style scoped>
  .cart {
  border: 1px solid #ccc;
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