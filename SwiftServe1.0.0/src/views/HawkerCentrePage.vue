<template>
    <div id="app">
      <Header />
      <CategoryNav @category-selected="updateActiveCategory" />
      <div class="food-grid">
        <FoodItem 
          v-for="item in filteredItems" 
          :key="item.id" 
          :item="item" 
          @add-to-cart="addItemToCart" 
          @click="viewFoodItem(item.id)"
        />
      </div>
      <OrderCart :items="cartItems" @remove-item="removeItemFromCart" />
      <div class="checkout">
        <p>Total Amount: ${{ totalAmount }}</p>
        <button @click="checkout">Checkout</button>
        <button @click="cancelOrder">Cancel Order</button>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import CategoryNav from '../components/CategoryNav.vue';
  import FoodItem from '../components/FoodItem.vue';
  import OrderCart from '../components/OrderCart.vue';
  
  export default {
    components: {
      Header,
      CategoryNav,
      FoodItem,
      OrderCart,
    },
    data() {
      return {
        activeCategory: 'Chinese',
        items: [
          // Your food item data here (replace with your actual data)
          { id: 1, name: 'Chicken Rice Set', price: 5.50, category: 'Chinese', image: 'images/chicken-rice.jpg' },
          { id: 2, name: 'Roasted Chicken Rice', price: 4.80, category: 'Chinese', image: 'images/roasted-chicken-rice.jpg' },
          { id: 3, name: 'Char Siew Rice', price: 6.00, category: 'Chinese', image: 'images/char-siew-rice.jpg' },
          // ... more items
        ],
        cartItems: [],
      };
    },
    computed: {
      filteredItems() {
        if (this.activeCategory === 'All') {
          return this.items;
        }
        return this.items.filter(item => item.category === this.activeCategory);
      },
      totalAmount() {
        return this.cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
      }
    },
    methods: {
      updateActiveCategory(category) {
        this.activeCategory = category;
      },
      addItemToCart(item) {
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
      viewFoodItem(itemId) {
      this.$router.push(`/food-item/${itemId}`); // Navigate to the FoodItemPage with the item ID
    }
    }
  };
  </script>
  
  <style>
  #app {
  font-family: 'Arial', sans-serif; /* Choose your preferred font */
  max-width: 960px; /* Optional: Set a max-width for the container */
  margin: 0 auto;
  padding: 20px;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.food-item {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px; /* Add rounded corners */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

.food-item img {
  max-width: 100%;
  height: auto;
  border-bottom: 1px solid #eee; /* Add a separator below the image */
  margin-bottom: 10px;
}

.checkout {
  margin-top: 20px;
  text-align: right; /* Align checkout elements to the right */
}

.checkout button {
  background-color: #007bff; /* Blue background for buttons */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
  </style>