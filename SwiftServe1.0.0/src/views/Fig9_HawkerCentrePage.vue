<template>

  <div class="container">
    <!--<AppHeader />-->
    <HeaderScreen />
    <FilterButtons 
      :filters="availableFilters" 
      :activeFilter="activeCategory" 
      @filter-selected="updateActiveCategory" 
    />
    <CategoryNav 
      :categories="categories" 
      @category-selected="updateActiveCategory" 
      :activeCategory="activeCategory"
    />
    <div v-if="filteredStalls.length > 0" class="main-content">
      <StallList 
        :stalls="filteredStalls" 
        :activeStall="activeStall" 
        @stall-selected="updateActiveStall" 
      />
      <div class="food-area">
        <div class="food-grid">
        <FoodItem 
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
          @add-to-cart="addToCart"
          @click="viewFoodItem(item)"
        />
      </div>
      </div>
    </div>
    <div v-else class="no-stalls-message">No stalls found</div> 
    <div class="cart-and-checkout">
      <OrderCart :items="cartItems" @remove-item="removeItemFromCart" @edit-item="editCartItem" class="order-cart" /> 
      <CheckoutArea :totalAmount="totalAmount" @checkout="checkout" @cancelOrder="cancelOrder" class="checkout-area"/>
    </div>
             <!-- Custom Modal for No Items in Cart-->
             <div v-if="showCartModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-text">
          <h2>Notification</h2>
          <p>Cart is empty. Please add items in before proceeding.</p>
          <div class="modal-actions">
            <button @click="closeCartModal">Go back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  //import AppHeader from '../components/AppHeader.vue';
  import HeaderScreen from '@/components/FigX_UniversalHeader/UniversalHeader.vue'
  import CategoryNav from '../components/Fig9_HawkerCentrePage/CategoryNav.vue';
  import FoodItem from '../components/Fig9_HawkerCentrePage/FoodItem.vue';
  import OrderCart from '../components/Fig9_HawkerCentrePage/OrderCart.vue';
  import StallList from '../components/Fig9_HawkerCentrePage/StallList.vue';
  import FilterButtons from '../components/Fig9_HawkerCentrePage/DietFilter.vue';
  import CheckoutArea from '../components/Fig9_HawkerCentrePage/CheckoutArea.vue';
  import { db } from '../firebase.js';
  import { getAuth, onAuthStateChanged } from "firebase/auth"
  
  export default {
    components: {
      //AppHeader,
      HeaderScreen,
      CategoryNav,
      FoodItem,
      OrderCart,
      StallList,
      FilterButtons,
      CheckoutArea
    },
    data() {
      return {
        activeCategory: 'All',
        activeStall: null, 
        stalls: [],
        items: [],
        availableFilters: [
          { label: 'Halal', value: 'Halal' },
          { label: 'Vegetarian', value: 'Vegetarian' },
        ],
        cartItems: [],
        categories: ['All', 'Chinese', 'Western', 'Malay', 'Indian', 'Others', 'Beverages'],
        user: null,
        HCName: false,
        showCartModal: false
      };
    },
    async mounted() {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.HCName = this.$route.query.HCName;
          console.log(this.HCName);

          // this.fetchStalls();
          // this.fetchFoodItems();
          // this.fetchCartItems();
          this.setupStallListener();
          this.setupFoodItemsListener();
          this.setupCartListener();
        } 
      });
    },
    computed: {
      filteredItems() {
        let filtered = this.items;
        if (this.activeCategory === 'All') {
          filtered = filtered.filter(item => {
            const stall = this.stalls.find(stall => stall.uid === item.merchantId);
            return stall;
          });
        }
        else if (this.activeCategory === 'Halal') {
          filtered = filtered.filter(item => {
            const stall = this.stalls.find(stall => stall.uid === item.merchantId && stall.halal);
            return stall;
          });
        } else if (this.activeCategory === 'Vegetarian') {
          filtered = filtered.filter(item => {
            const stall = this.stalls.find(stall => stall.uid === item.merchantId && stall.vegetarian);
            return stall;
          });
        } else if (this.activeCategory !== 'All') {
          filtered = filtered.filter(item => {
            const stall = this.stalls.find(stall => stall.uid === item.merchantId && stall.category === this.activeCategory);
            return stall;
          });
        }
        if (this.activeStall) {
          filtered = filtered.filter(item => item.merchantId === this.activeStall.uid);
        }
        return filtered;
      },
      filteredStalls() {
        if (this.activeCategory === 'Halal') {
          return this.stalls.filter(stall => stall.halal);
        } else if (this.activeCategory === 'Vegetarian') {
          return this.stalls.filter(stall => stall.vegetarian);
        } else if (this.activeCategory === 'All') {
          return this.stalls;
        } else {
          return this.stalls.filter(stall => stall.category === this.activeCategory);
        }
      },
      totalAmount() {
        return this.cartItems.reduce((total, item) => total + item.foodItemPrice, 0).toFixed(2);
      }
    },
    methods: {
      // async fetchStalls() {
      //   try {
      //     const querySnapshot = await db.collection('UserProfile')
      //                             .where('profileType', '==', 'Merchant')
      //                             .where('open', '==', true) // Check if the stall is open; if not open do not render on display
      //                             .get();
      //     this.stalls = querySnapshot.docs.map(doc => ({
      //       ...doc.data(),
      //       uid: doc.id,
      //     }));
      //     //('Fetched stalls:', JSON.stringify(this.stalls)); // Check fetched stalls
      //   } catch (error) {
      //     console.error('Error fetching stalls: ', error);
      //   }
      // },
      // async fetchFoodItems() {
      //   try {
      //     const querySnapshot = await db.collection('FoodItem').get();
      //     this.items = querySnapshot.docs.map(doc => ({
      //       // ...doc.data(),
      //       id: doc.id,
      //       foodItemName: doc.data().foodItemName,
      //       available: doc.data().available,
      //       merchantId: doc.data().merchantId,  
      //       foodItemImage: doc.data().foodItemImagef,
      //     }));
      //     //console.log('Fetched items:', JSON.stringify(this.items)); // Check fetched items
      //   } catch (error) {
      //     console.error('Error fetching items: ', error);
      //   }
      // },
      closeCartModal() {
        this.showCartModal = false;
      },
      setupStallListener() {
        db.collection('UserProfile')
        .where('profileType', '==', 'Merchant')
        .onSnapshot((querySnapshot) => {
          this.stalls = querySnapshot.docs
            .filter(doc => doc.data().open) // Only include open stalls
            .map(doc => ({
              ...doc.data(),
              uid: doc.id,
            }));
          console.log('Stalls updated:', this.stalls);
          this.cartItems.forEach(cartItem => this.checkAndRemoveItem(cartItem));
        }, (error) => {
          console.error('Error listening to stalls updates:', error);
        });
      },
      setupFoodItemsListener() {
        db.collection('FoodItem')
          .onSnapshot((querySnapshot) => {
            this.items = querySnapshot.docs.map(doc => ({
              id: doc.id,
              foodItemName: doc.data().foodItemName,
              available: doc.data().available,
              merchantId: doc.data().merchantId,  
              foodItemImage: doc.data().foodItemImage,
            }));
            console.log('Food items updated:', this.items);
            this.cartItems.forEach(cartItem => this.checkAndRemoveItem(cartItem));
          }, (error) => {
            console.error('Error listening to food items updates:', error);
          });
      },
      // async fetchCartItems() {
      //   try {
      //     const querySnapshot = await db.collection('Cart').where('userId', '==', this.user.uid).get();
      //     this.cartItems = querySnapshot.docs.map(doc => ({
      //       ...doc.data(),
      //       id: doc.id,
      //     }));
      //     //console.log('Fetched cart items:', JSON.stringify(this.cartItems)); // Check fetched cart items
      //   } catch (error) {
      //     console.error('Error fetching cart items: ', error);
      //   }
      // },
      setupCartListener() {
        db.collection('Cart')
          .where('userId', '==', this.user.uid)
          .onSnapshot((querySnapshot) => {
            this.cartItems = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            console.log('Cart items updated:', this.cartItems);

            // Check for unavailable items or closed stalls
            this.cartItems.forEach(cartItem => this.checkAndRemoveItem(cartItem));
          }, (error) => {
            console.error('Error listening to cart updates:', error);
          });
      },
      async checkAndRemoveItem(cartItem) {
        const foodItemRef = db.collection('FoodItem').doc(cartItem.foodItemId);
        const foodItemSnapshot = await foodItemRef.get();

        if (foodItemSnapshot.exists) {
          const foodItemData = foodItemSnapshot.data();

          // Check if the food item is unavailable
          if (!foodItemData.available) {
            await this.removeItemFromCart(cartItem.id);
            return;
          }

          // Check if the stall is closed
          const stallRef = db.collection('UserProfile').doc(foodItemData.merchantId);
          const stallSnapshot = await stallRef.get();

          if (stallSnapshot.exists && !stallSnapshot.data().open) {
            await this.removeItemFromCart(cartItem.id);
          }
        }
      },
      async removeItemFromCart(itemId) {
        try {
          await db.collection('Cart').doc(itemId).delete();
          this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        } catch (error) {
          console.error('Error removing item from cart: ', error);
        }
      },
      updateActiveCategory(category) {
        this.activeCategory = category;
        this.activeStall = null;
      },
      updateActiveStall(stall) {
        this.activeStall = stall;
      },
      addToCart(item) {
        this.cartItems.push(item);
      },
      checkout() {
        if (this.cartItems.length === 0) {
          this.showCartModal = true;
          return;
        }
        this.$router.push({
          path: '/checkout',
          query: {HCName: this.HCName}
        })
        //alert('Checkout functionality coming soon!');
      },
      cancelOrder() {
        for (let item of this.cartItems) {
          this.removeItemFromCart(item.id)
        }
        //this.cartItems = [];
        //console.log(this.cartItems)
      },
      findStall(merchantId) {
        return this.stalls.find(stall => stall.uid === merchantId);
      },
      viewFoodItem(item) {
        if (item.available) {
          console.log(this.HCName)
          this.$router.push({
            name: 'foodItemPage',
            params: {
              id: item.id,  // Pass the food item ID
            },
            query: {
              HCName: this.HCName 
            }
          });
        }
      },
      editCartItem(item) {
        //console.log("hello");
        console.log(item);
        this.$router.push({
          name: 'foodItemPage',
          params: {
            cartItemId: item.id,  // Pass the cart item ID
          },
          query: {
            HCName: this.HCName
          }
        });
      }

    }
  };
</script>

<style>
.container {
  font-family: 'Inria Sans', sans-serif;  
  max-width: 1536px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  overflow-y: auto;
  height: 100vh;
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

.main-content {
  display: flex; 
  margin-top: 1.25rem;
}

.food-area {
  flex: 1;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15.625rem, 15.625rem));
  gap: 1.25rem;
}

/* Order Cart Styles */

.cart-and-checkout {
    display: flex;
    width: 100%;
    align-items: flex-start;
  }

.order-cart {
  flex: 4;
  margin-right: 20px;
  justify-content: flex-start;
  padding-top: 0;
}

.active {
  color: #00ADB5;  
  font-weight: bold; 
}

.checkout-area {
  flex: 1;
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  padding-top: 0;
  margin: 0;
}

.no-stalls-message {
  text-align: center;
  font-size: 1.5625rem;
  margin-top: 0.625rem;
  font-weight: bold;
}
/* Modal styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  border: 2px solid #00adb5;
  width: 400px;
  padding: 30px;
  position: relative;
  z-index: 1010;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #00adb5;
  color: white;
  border: none;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
}

.modal-text h2 {
  margin-bottom: 10px;
  color: #00adb5;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.modal-text p {
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 20px;
  color: #00adb5;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-actions button {
  background-color: #00adb5;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-size: 15px;
  margin-bottom: 10px;
}

.modal-actions button:last-child {
  margin-bottom: 0;
}

.modal-actions button:hover { 
  background-color: #007a80;
}
</style>
