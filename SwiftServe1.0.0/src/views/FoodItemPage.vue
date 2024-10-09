<template>
    <div class="food-item-details">
      <Header />
      <div class="food-details-section">
        <div class="food-image">
          <img :src="foodItem.image" :alt="foodItem.name">
        </div>
        <div class="food-info">
          <h1>{{ foodItem.name }}</h1>
          <p class="price">${{ foodItem.price }}</p>
  
          <div class="quantity-controls">
            <button @click="decreaseQuantity">-</button>
            <span>{{ quantity }}</span>
            <button @click="increaseQuantity">+</button>
          </div>
        </div>
      </div>
  
      <AddOn :addOns="addOns" @updateAddOn="updateAddOn" />
  
      <SpecialInstructions 
        v-model="specialInstructions" 
      />
  
      <div class="action-buttons">
        <button class="add-to-cart" @click="addToCart">Add to Cart</button>
        <button class="cancel-order" @click="cancelOrder">Cancel Order</button>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import AddOn from '../components/AddOn.vue';
  import SpecialInstructions from '../components/SpecialInstructions.vue';
  
  export default {
    data() {
      return {
        foodItem: {
          id: 1,
          name: "Chicken Rice Set",
          image: "/path-to-image/chicken-rice.jpg",
          price: 6.99,
        },
        quantity: 1,
        addOns: [
          { id: 1, name: "Rice", price: 0.6, quantity: 0 },
          { id: 2, name: "Chicken", price: 1.5, quantity: 1 },
          { id: 3, name: "Curry", price: 1.5, quantity: 1 },
          { id: 4, name: "Vegetable", price: 1.5, quantity: 1 },
        ],
        specialInstructions: ""
      };
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
      addToCart() {
        // Handle adding to cart
        // Create a cart item object
        const cartItem = {
            ...this.foodItem,
            quantity: this.quantity,
            addOns: this.addOns.filter(addOn => addOn.quantity > 0),
            specialInstructions: this.specialInstructions
        };

        // Emit the item to be added to the cart
        this.$emit('add-item', cartItem);

        // Show pop-up notification (use a toast library or alert for now)
        alert('Item added to cart');

        // Navigate back to the HawkerCentrePage
        this.$router.push('/hawker')
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
    background-color: #00aaff;
    border: none;
    color: white;
    padding: 5px;
    cursor: pointer;
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
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
  }
  
  .add-to-cart {
    background-color: #00aaff;
    color: white;
  }
  
  .cancel-order {
    background-color: #ff5555;
    color: white;
  }
  </style>

  