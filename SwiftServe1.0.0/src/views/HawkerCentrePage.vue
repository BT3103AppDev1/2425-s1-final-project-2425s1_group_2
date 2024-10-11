<template>
  <div id="app">
    <Header />
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
    
    <OrderCart :items="cartItems" @remove-item="removeItemFromCart" />
    
    <div class="checkout">
      <p>Total Amount: ${{ totalAmount }}</p>
      <button @click="checkout">Checkout</button>
      <button @click="cancelOrder">Cancel Order</button>
    </div>
    
    <router-view :add-to-cart="addToCart"></router-view>
  </div>
</template>
  
  <script>
  import Header from '../components/Header.vue';
  import CategoryNav from '../components/CategoryNav.vue';
  import FoodItem from '../components/FoodItem.vue';
  import OrderCart from '../components/OrderCart.vue';
  import StallList from '../components/StallList.vue';
  // import { EventBus } from '../eventBus.js';
  
  export default {
    components: {
      Header,
      CategoryNav,
      FoodItem,
      OrderCart,
      StallList
    },
    // created() {
    //   EventBus.$on('add-to-cart', this.addToCart);
    // },
    // beforeUnmount() {
    //   EventBus.$off('add-to-cart', this.addToCart);
    // },
    data() {
      return {
        activeCategory: 'Chinese',
        activeStall: null, // Added to store the selected stall
        stalls: [
        { id: 1, name: 'Chin Lee Chicken Rice', category: 'Chinese', addOns: [{name: 'Extra Rice', price: 1.0}, {name: 'Egg', price: 0.8}] },
        { id: 2, name: 'Adam Briyani', category: 'Indian', addOns: [{name: 'Raita', price: 0.5}, {name: 'Boiled Egg', price: 1.0}] },
        { id: 3, name: 'Octopus Drinks', category: 'Beverages', addOns: [{name: 'Ice', price: 0.3}, {name: 'Condensed Milk', price: 0.4}] }
          // ... more stalls
        ],
        items: [
          // Your food item data here (replace with your actual data)
          { id: 1, name: 'Chicken Rice Set', price: 5.50, category: 'Chinese', image: 'images/chicken-rice.jpg', stallId: 1 },
          { id: 2, name: 'Roasted Chicken Rice', price: 4.80, category: 'Chinese', image: 'images/roasted-chicken-rice.jpg', stallId: 1 },
          { id: 3, name: 'Char Siew Rice', price: 6.00, category: 'Chinese', image: 'images/char-siew-rice.jpg', stallId: 1 },
          { id: 4, name: 'Chicken Briyani', price: 7.00, category: 'Indian', image: 'images/chicken-briyani.jpg', stallId: 2 },
          { id: 5, name: 'Kopi Bing', price: 1.50, category: 'Beverages', image: 'images/kopi-bing.jpg', stallId: 3 },
          // ... more items
        ],
        cartItems: [],
      };
    },
    computed: {
      filteredItems() {
        let filtered = this.items;
        if (this.activeCategory !== 'All') {
          filtered = filtered.filter(item => item.category === this.activeCategory);
        }
        if (this.activeStall) {
          filtered = filtered.filter(item => item.stallId === this.activeStall.id);
        }
        return filtered;
      },
      filteredStalls() {
        if (this.activeCategory === 'All') {
          return this.stalls;
        }
        return this.stalls.filter(stall => stall.category === this.activeCategory);
      },
      totalAmount() {
        return this.cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
      }
    },
    methods: {
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
      removeItemFromCart(itemId) {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      },
      checkout() {
        // Implement checkout logic here
        alert('Checkout functionality coming soon!');
      },
      cancelOrder() {
        this.cartItems = [];
      },
      viewFoodItem(item) {
        this.$router.push({
          name: 'FoodItemPage',
          params: {
            id: item.id,        // Pass the food item ID 
            name: item.name,    // Pass the food item name
            price: item.price,   // Pass the food item price
            addOns: this.activeStall ? this.activeStall.addOns : []  // Pass add-ons for the selected stall
          }
        });
      }
    
    }
  };
  </script>
  

<style>
#app {
  font-family: 'Arial', sans-serif;  /* Or your chosen font */
  width: 95%;
  margin: 0 auto;
  padding: 20px;
}

/* Header Styles */
header { 
  display: flex;
  justify-content: space-between;
  align-items: center;  

  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}

header h1 {
  font-size:  
 24px;
  color: #00ADB5;  /* Your green */
}

/* Navigation Styles */
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav li {
  margin-right: 20px;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  padding: 10px;  
  border-bottom: 2px solid transparent; /* For active state effect later */
}

nav .active {  /* Style the active category */
  color: #00ADB5;
  border-bottom-color: 2px solid#00ADB5;
}

/* Main Content Area */
.main-content {
  display: flex; 
  margin-top: 20px;
}

/* Stall List */
.stall-list {
  width: 200px; 
  border-right: 1px solid #ccc;
  margin-right: 20px; 
  overflow-y: auto;
}

.stall-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.stall-item.active {
  background-color: #f0f0f0; 
  font-weight: bold;
}

.food-area {
  flex: 1;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.food-item {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.food-item img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
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

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.cart-item  
 img {
  width: 50px;
  height:  
 auto;
  margin-right: 10px;
}

/* Checkout Styles */
.checkout {
  margin-top: 20px;
  text-align: right;
}

.checkout button {
  background-color: #00ADB5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px; 
}

.active {
  color: #00ADB5;  
  font-weight: bold; 
}

</style>