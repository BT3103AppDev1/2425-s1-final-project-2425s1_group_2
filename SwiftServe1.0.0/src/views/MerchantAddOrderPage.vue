<template>
    <div>
      <h2>Create New Food Item</h2>
      <FoodItemForm @submit="handleSubmit" />
    </div>
  </template>
  
  <script>
  import FoodItemForm from '../components/MerchantAddFoodItemForm.vue';
  import {db} from '../firebase.js';
  
  export default {
    components: { FoodItemForm },
    methods: {
      async handleSubmit(foodItemData) {
        // Assuming `db` is your Firestore instance
        const foodItemsRef = db.collection('FoodItem');
        await foodItemsRef.add(foodItemData);
        alert("Food item added successfully!");
      }
    }
  };
  </script>
  