<template>
    <HeaderScreen />
    <div class="container">
      <h2>Create New Food Item</h2>
      <FoodItemForm @submit="handleSubmit" />
    </div>
  </template>
  
  <script>
import FoodItemForm from '../components/MerchantAddFoodItemForm.vue';
  import {db} from '../firebase.js';
  import HeaderScreen from '@/components/FigX_UniversalHeader/MerchantUniversalHeader.vue';
  
  export default {
    components: { FoodItemForm, HeaderScreen },
    methods: {
      async handleSubmit(foodItemData) {
        // Assuming `db` is your Firestore instance
        const foodItemsRef = db.collection('FoodItem');
        //console.log("hi");
        await foodItemsRef.add(foodItemData);
        alert("Food item added successfully!");
      }
    }
  };
  </script>

  <style scoped>
  .container {
    font-family: 'Inria Sans', sans-serif;
  }

  h2 {
    text-align: center;
  }
  </style>

  