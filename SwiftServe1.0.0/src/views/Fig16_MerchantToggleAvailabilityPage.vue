<template>
    <div class="merchant-toggle">
      <div class="toggle-header">
        <div class="controls">
          <button @click="closeStall">Close Stall</button>
          <label class="switch">
            <input type="checkbox" v-model="isStallOpen" @change="toggleStallAvailability">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="food-items">
        <FoodItem 
          v-for="item in foodItems" 
          :key="item.id" 
          :item="item" 
          @click="toggleFoodItemAvailability(item)"
          :class="{ unavailable: !item.available }" 
        />
      </div>
    </div>
  </template>
  
  <script>
  import FoodItem from '../components/Fig9_HawkerCentrePage/FoodItem.vue';
  import { db } from '../firebase.js';
  
  export default {
    components: {
      FoodItem,
    },
    data() {
      return {
        merchantId: 'VScvqRThQSKVCihILf9v', // hardcoded for now using Chin Lee Chicken Rice
        merchantName: '',
        isStallOpen: false,
        foodItems: null,
        merchant: null,
      };
    },
    async mounted() {
      await this.fetchMerchantData();
      await this.fetchFoodItems();
    },
    methods: {
      async fetchMerchant(merchantId) {
        try {
            const merchantDoc = await db.collection('UserProfile').doc(merchantId).get();
            if (merchantDoc.exists) {
            this.merchant = merchantDoc.data();
            this.isStallOpen = this.merchant.open;
            } else {
            console.error('No such merchant!');
            }
        } catch (error) {
            console.error('Error fetching merchant:', error);
        }
      },
      async fetchFoodItems(merchantId) {
        try {
        const foodItemsSnapshot = await db.collection('foodItem').where('merchantId', '==', merchantId).get();

        if (!foodItemsSnapshot.empty) {
            this.foodItems = foodItemsSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            available: doc.data().available
            }));
        } else {
            console.error('No food items found for this merchant!');
        }
        } catch (error) {
        console.error('Error fetching food items:', error);
        }
      },
      async toggleFoodItemAvailability(item) {
        try {
            const foodItemRef = db.collection('foodItem').doc(item.id);

            await foodItemRef.update({
            available: !item.available
            });

            // Update the local item availability status 
            item.available = !item.available;
        } catch (error) {
            console.error('Error updating food item availability:', error);
        }
      },
      async toggleStallAvailability() {
        try {
            const userProfileRef = db.collection('userProfile').doc(this.merchantId);

            await userProfileRef.update({
            open: this.isStallOpen
            });
        } catch (error) {
            console.error('Error updating stall availability:', error);
        }
      },
      closeStall() {
        this.isStallOpen = false; // Immediately update the UI
        this.toggleStallAvailability(); // Update Firestore
      },
    },
  };
  </script>
  
  <style scoped>
  /* ... (Your CSS styles here) */
  .unavailable {
    opacity: 0.5; 
  }
  </style>