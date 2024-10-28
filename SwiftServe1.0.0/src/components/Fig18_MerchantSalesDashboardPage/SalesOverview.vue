<template>
    <div class="sales-overview">
      <div class="sales-text">Total Sales Amount</div>
      <div class="sales-amount">{{ salesAmount }}</div>
      <div class="orders-text">Orders Completed</div>
      <div class="orders-count">{{ ordersCompleted }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SalesOverview",
    props: {
      salesAmount: {
        type: Number,
        required: true,
      },
      ordersCompleted: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .sales-overview {
    background-color: #00adb5;
    padding: 20px;
    color: white;
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  