<template>
  <div class="left-column">
    <p class="food-stall">{{ merchant.displayName }}</p>
    <div class="food-image">
      <img :src="foodItem.foodItemImage" :alt="foodItem.foodItemName" />
      <hr class="separator" />
    </div>
    <h1 class="food-name">{{ foodItem.foodItemName }}</h1>
    <div class="food-info">
      <div class="price-quantity">
        <p class="price">${{ totalPrice.toFixed(2) }}</p>
        <div class="quantity-controls">
          <span class="quantity">× {{ quantity }}</span>
          <button @click="decreaseQuantity" class="quantity-btn" aria-label="Decrease quantity">
            -
          </button>
          <button @click="increaseQuantity" class="quantity-btn" aria-label="Increase quantity">
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoodItemLeftColumn',
  props: {
    foodItem: Object,
    merchant: Object,
    quantity: Number,
    totalPrice: Number
  },
  methods: {
    increaseQuantity() {
      this.$emit('increase-quantity')
    },
    decreaseQuantity() {
      this.$emit('decrease-quantity')
    }
  }
}
</script>

<style scoped>
.left-column {
  flex: 1;
  padding-right: 15px;
}

.food-image img {
  width: 100%;
  height: 380px;
  border-radius: 8px;
}

.food-stall {
  font-size: 50px;
  font-weight: bold;
  padding: 0; 
  margin: 10px;
}

.food-name {
  font-size: 35px;
  margin-bottom: 0;
  /* margin-top: 15px; */
  /* margin-bottom: 5px; */
}

/* .food-info {
  margin-top: 15px;
} */

.price-quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px;
  padding: 0;
}

.price {
  font-size: 50px;
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #00adb5;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-left: 40px;
}

.quantity-btn:hover {
  background-color: #50d4da; /* Lighter green on hover */
}

.quantity {
  /* margin: 0 10px; */
  font-size: 30px;
  margin-right: 100px;
}

.separator {
  border: none;
  border-top: 5px solid #000000;
  margin: 10px 0;
}
</style>
