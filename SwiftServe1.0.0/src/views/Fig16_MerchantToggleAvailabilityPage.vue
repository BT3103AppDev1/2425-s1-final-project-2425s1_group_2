<template>
  <div class="container">

    <HeaderScreen/>
    <h2 class="pageText">Food Availability Toggle Menu</h2>

    <div class="food-items-header">
      <h3>Food items</h3>
      <ToggleSwitch v-model="isStallOpen" @input="toggleStallAvailability" />
    </div>

    <div class="food-items">
      <div class="food-item-grid">
        <FoodItem 
          v-for="item in foodItems" 
          :key="item.id"  
          :item="item" 
          @toggle-availability="toggleFoodItemAvailability" 
        />
      </div>
    </div>

    <p class="instruction">Tap Image to Disable/Enable Availability</p>
  </div>
</template>

  
  <script>
  import HeaderScreen from '@/components/FigX_UniversalHeader/MerchantUniversalHeader.vue';
  import FoodItem from '../components/Fig16_MerchantToggleAvailabilityPage/MerchantToggleFoodItemAvailability.vue';
  import ToggleSwitch from '../components/Fig16_MerchantToggleAvailabilityPage/MerchantToggleSwitch.vue';
  import { db } from '../firebase.js';
  import { getAuth, onAuthStateChanged } from "firebase/auth"
  
  export default {
    components: {
      HeaderScreen,
      FoodItem,
      ToggleSwitch
    },
    data() {
      return {
        // merchantId: 'VScvqRThQSKVCihILf9v', 
        // merchantName: '',
        isStallOpen: false,
        foodItems: null,
        merchant: null,
        user: null,
      };
    },
    async mounted() {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;

          // Fetch merchant details and food items
          this.fetchMerchant(this.user.uid);
          this.fetchFoodItems(this.user.uid);
        } 
      });
      // await this.fetchMerchant(this.merchantId);
      // await this.fetchFoodItems(this.merchantId);
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
        const foodItemsSnapshot = await db.collection('FoodItem').where('merchantId', '==', merchantId).get();

        if (!foodItemsSnapshot.empty) {
            this.foodItems = foodItemsSnapshot.docs.map(doc => ({
              id: doc.id,
              foodItemName: doc.data().foodItemName,
              available: doc.data().available,
              foodItemImage: doc.data().foodItemImage,
            }));
            console.log(JSON.stringify(this.foodItems));
        } else {
            console.error('No food items found for this merchant!');
        }
        } catch (error) {
        console.error('Error fetching food items:', error);
        }
      },
      async toggleFoodItemAvailability(item) {
        try {
            const foodItemRef = db.collection('FoodItem').doc(item.id);

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
            const userProfileRef = db.collection('UserProfile').doc(this.merchantId);

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
.container {
  font-family: Inria Sans, sans-serif;
  max-width: 1536px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

/* 2xl */
@media (max-width: 1536px) {
  .container {
    max-width: 1280px;
  }
}

/* xl */
@media (max-width: 1280px) {
  .container {
    max-width: 1024px;
  }
}

/* lg */
@media (max-width: 1024px) {
  .container {
    max-width: 768px;
  }
}

/* md */
@media (max-width: 768px) {
  .container {
    max-width: 640px;
  }
}

/* sm */
@media (max-width: 640px) {
  .container {
    max-width: 475px;
  }
}

/* xs */
@media (max-width: 475px) {
  .container {
    width: 100%;
  }
}

.pageText {
  text-align: center;
}

h1, h2, h3 {
  color: #333;
}

.food-items-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.food-item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  border: 1px solid #00ADB5;
  border-radius: 20px;
  padding: 10px;
  flex-wrap: wrap;
}

.instruction {
  text-align: center;
  color: #00ADB5;
  margin-top: 20px;
}
</style>