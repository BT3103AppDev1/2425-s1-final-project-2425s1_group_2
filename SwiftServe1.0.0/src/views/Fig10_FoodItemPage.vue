<template>
    <div class="food-item-page">
      <HeaderTag />
      <div class="food-item-details">
      <div class="left-column">
        <div class="food-image">
          <img :src="foodItem.image" :alt="foodItem.name">
        </div>
        <h1 class="food-name">{{ foodItem.name }}</h1>
        <div class="food-info">
          <h2 class="food-set-name">Chicken Rice Set</h2>
          <div class="price-quantity">
            <p class="price">${{ totalPrice.toFixed(2) }}</p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity" class="quantity-btn" aria-label="Decrease quantity">-</button>
              <span class="quantity">× {{ quantity }}</span>
              <button @click="increaseQuantity" class="quantity-btn" aria-label="Increase quantity">+</button>
            </div>
          </div>
        </div>
      </div>

      <div class="right-column">
        <div class="green-box">
          <div class="add-ons">
            <AddOn :addOns="addOns" @updateAddOn="updateAddOn" />
          </div>

          <div class="special-instructions">
            <SpecialInstructions v-model="specialInstructions" />
          </div>
        </div>

        <div class="action-buttons">
          <button class="add-to-cart" @click="addToCartHandler">
            <span class="cart-icon">🛒</span> Add to Cart
          </button>
          <button class="cancel-order" @click="cancelOrder">
            <span class="cancel-icon">❌</span> Cancel Order
          </button>
        </div>
      </div>
    </div>

    </div>
  </template>
     
  <script>

  import HeaderTag from '../components/Header.vue';
  import AddOn from '../components/Fig10_FoodItemPage/AddOn.vue';
  import SpecialInstructions from '../components/Fig10_FoodItemPage/SpecialInstructions.vue';
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
        this.$router.push('/hawkerCentre');
      },
      cancelOrder() {
        // Handle cancel order
        this.$router.push('/hawkerCentre');
      }
    }
  };
  </script>

  <style scoped>
  .food-item-page {
    font-family: Arial, sans-serif;
    max-width: 95%;
    margin: 0 auto;
  }
  
  .icon {
    font-size: 20px;
  }
  
  .food-item-details {
    display: flex;
    background-color: white;
    padding: 15px;
  }
  
  .left-column {
    flex: 1;
    padding-right: 15px;
  }
  
  .right-column {
    flex: 1;
    padding-left: 15px;
  }
  
  .food-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .food-name {
    font-size: 24px;
    font-weight: bold;
    margin-top: 15px;
  }
  
  .food-info {
    margin-top: 15px;
  }
  
  .food-set-name {
    font-size: 18px;
    font-weight: bold;
  }
  
  .price-quantity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  
  .price {
    font-size: 24px;
    font-weight: bold;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
  }
  
  .quantity-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #00A895;
    color: white;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
  
  .quantity {
    margin: 0 10px;
    font-size: 18px;
  }
  
  .green-box {
    background-color: #e6f7f5;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .add-ons, .special-instructions {
    margin-bottom: 20px;
  }
  
  .add-ons h2, .special-instructions h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;
  }
  
  .add-to-cart, .cancel-order {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    width: 25%;
  }
  
  .add-to-cart {
    background-color: #00A895;
    color: white;
  }
  
  .cancel-order {
    background-color: #00A895;
    color: white;
  }
  
  .cart-icon, .cancel-icon {
    margin-right: 5px;
  }
  </style>