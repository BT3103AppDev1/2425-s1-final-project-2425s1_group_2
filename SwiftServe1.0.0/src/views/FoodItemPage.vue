<template>
    <div class="food-item-details">
      <HeaderTag />
      <div class="food-details-section">
        <div class="food-image">
          <img :src="foodItem.image" :alt="foodItem.name">
        </div>
        <div class="food-info">
          <h1>{{ foodItem.name }}</h1>
          <p class="price">${{ totalPrice.toFixed(2) }}</p>
  
          <div class="quantity-controls">
            <button @click="decreaseQuantity">-</button>
            <span class="quantity">{{ quantity }}</span>
            <button @click="increaseQuantity">+</button>
          </div>
        </div>
      </div>
  
      <AddOn :addOns="addOns" @updateAddOn="updateAddOn" />
  
      <SpecialInstructions 
        v-model="specialInstructions" 
      />
  
      <div class="action-buttons">
        <button class="add-to-cart" @click="addToCartHandler">Add to Cart</button>
        <button class="cancel-order" @click="cancelOrder">Cancel Order</button>
      </div>
    </div>
  </template>
     
  <script>
  import HeaderTag from '../components/Header.vue';
  import AddOn from '../components/AddOn.vue';
  import SpecialInstructions from '../components/SpecialInstructions.vue';
  // import { EventBus } from '../eventBus.js';
  
  export default {
    components: {
      HeaderTag,
      AddOn,
      SpecialInstructions
    },
    data() {
      return {
        foodItem: {
          id: null,
          name: '',
          image: '',
          price: null,
        },
        quantity: 1,
        addOns: [],
        specialInstructions: "",
        addToCart: null
      };
    },
    created() {
      // Fetch food item details from route params when the component is created
      const { id, name, price, addToCart, stallId } = this.$route.params;
      this.foodItem.id = id;
      this.foodItem.name = name;
      this.foodItem.price = price;
      this.foodItem.image = "images/chicken-rice.jpg"; // or set based on id if needed
      this.addToCart = addToCart;
      // this.addOns = addOns ? JSON.parse(addOns) : [];
      console.log(this.$route.params.stallId);
      const availableAddOns = {
      1: [ // Add-ons for stall with ID 1
        { id: 1, name: "Extra Rice", price: 1.0, quantity: 0 },
        { id: 2, name: "Egg", price: 0.8, quantity: 0 }
      ],
      2: [ // Add-ons for stall with ID 2
        { id: 3, name: "Raita", price: 0.5, quantity: 0 },
        { id: 4, name: "Boiled Egg", price: 1.0, quantity: 0 }
      ],
      3: [ // Add-ons for stall with ID 3
        { id: 5, name: "Ice", price: 0.3, quantity: 0 },
        { id: 6, name: "Condensed Milk", price: 0.4, quantity: 0 }
      ]
    };

      this.addOns = availableAddOns[stallId] || [];
    },
    computed: {
      totalPrice() {
        // Base price of the food item multiplied by the quantity
        let basePrice = this.foodItem.price * this.quantity;

        // Add the price of any selected add-ons
        const addOnTotal = this.addOns.reduce((total, addOn) => {
          return total + addOn.price * addOn.quantity;
        }, 0);

        return basePrice + addOnTotal;
      }
    },
    methods: {
      increaseQuantity() {
        this.quantity++;
      },
      decreaseQuantity() {
        if (this.quantity > 1) this.quantity--;
      },
      updateAddOn(updatedAddOn) {
        const addOnIndex = this.addOns.findIndex(a => a.id === updatedAddOn.id);
        if (addOnIndex !== -1) {
          this.addOns[addOnIndex] = updatedAddOn;
        }
      },
      addToCartHandler() {
        // Handle adding to cart
        // Create a cart item object
        /*const cartItem = {
            ...this.foodItem,
            quantity: this.quantity,
            addOns: this.addOns.filter(addOn => addOn.quantity > 0),
            specialInstructions: this.specialInstructions
        };*/

        // EventBus.$emit('add-to-cart', cartItem);
        alert('Item added to cart');
        this.$router.push('/hawker');
      },
      cancelOrder() {
        // Handle cancel order
        this.$router.push('/hawker');
      }
    }
  };
  </script>
  
  <style scoped>
  .food-item-details {
    padding: 20px;
  }
  
  .food-details-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .food-image img {
    width: 100%;
    max-width: 300px;
  }
  
  .food-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .quantity-controls button {
    background-color: #00A895;
    border-radius: 100%;
    color: white;
    cursor: pointer;
    border-color: #00A895;
  }

  .quantity-controls .quantity {
    font-size: 1.2rem;
    margin: 0 15px; 
    font-weight: bold;
  }
  
  .price {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .action-buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .add-to-cart, .cancel-order {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    /* border-radius: 10%; */
    cursor: pointer;
  }
  
  .add-to-cart {
    background-color: #00A895;
    color: white;
  }
  
  .cancel-order {
    background-color: #00A895;
    color: white;
  }

  </style>

   
 
