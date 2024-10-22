<template>

  <div id="app">
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
    <div class="main-content">
      <StallList 
        :stalls="filteredStalls" 
        :activeStall="activeStall" 
        @stall-selected="updateActiveStall" 
      />
      <div class="food-area">
        <div v-if="filteredStalls.length > 0" class="food-grid">
        <FoodItem 
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
          @add-to-cart="addToCart"
          @click="viewFoodItem(item)"
        />
      </div>
      <div v-else class="no-stalls-message">No stalls found</div> 
      </div>
    </div>
    <div class="cart-and-checkout">
      <OrderCart :items="cartItems" @remove-item="removeItemFromCart" @edit-item="editCartItem" class="order-cart" /> 
      <CheckoutArea :totalAmount="totalAmount" @checkout="checkout" @cancelOrder="cancelOrder" class="checkout-area"/>
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
        activeCategory: 'Chinese',
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
      };
    },
    async mounted() {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.HCName = this.$route.query.HCName;
          console.log(this.HCName);

          this.fetchStalls();
          this.fetchFoodItems();
          this.fetchCartItems();
        } 
      });
    },
    computed: {
      filteredItems() {
        let filtered = this.items;
        if (this.activeCategory === 'Halal') {
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
      async fetchStalls() {
        try {
          const querySnapshot = await db.collection('UserProfile').where('profileType', '==', 'Merchant').get();
          this.stalls = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id,
          }));
          //('Fetched stalls:', JSON.stringify(this.stalls)); // Check fetched stalls
        } catch (error) {
          console.error('Error fetching stalls: ', error);
        }
      },
      async fetchFoodItems() {
        try {
          const querySnapshot = await db.collection('FoodItem').get();
          this.items = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          //console.log('Fetched items:', JSON.stringify(this.items)); // Check fetched items
        } catch (error) {
          console.error('Error fetching items: ', error);
        }
      },
      async fetchCartItems() {
        try {
          const querySnapshot = await db.collection('Cart').where('userId', '==', this.user.uid).get();
          this.cartItems = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
          }));
          //console.log('Fetched cart items:', JSON.stringify(this.cartItems)); // Check fetched cart items
        } catch (error) {
          console.error('Error fetching cart items: ', error);
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
      },
      editCartItem(item) {
        this.$router.push({
          name: 'foodItemPage',
          params: {
            cartItemId: item.id,  // Pass the cart item ID
          }
        });
      }

    }
  };
</script>

<style>
#app {
  font-family: 'Arial', sans-serif;  
  width: 95%;
  margin: 0 auto;
  padding: 20px;
}

.main-content {
  display: flex; 
  margin-top: 20px;
}

.food-area {
  flex: 1;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* Order Cart Styles */
.order-cart {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
}

.order-cart h2 {
  margin-top: 0;
}

.active {
  color: #00ADB5;  
  font-weight: bold; 
}

.cart-and-checkout {
    display: flex;
    width: 100%;
    margin-top: 20px;
  }

.order-cart {
  flex: 4;
  margin-right: 20px;
}

.checkout-area {
  flex: 1;
  display: flex;
  flex-direction: column; 
  align-items: flex-end; 
}

.no-stalls-message {
  text-align: center;
  font-size: 25px;
  margin-top: 10px;
  font-weight: bold;
}
</style>
