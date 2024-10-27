<template>
  <div class="food-item-container">
    <div class="left-column">
      <h1 class="food-stall">{{ merchant.displayName }}</h1>
      <div class="food-image">
        <img :src="foodItem.foodItemImage" :alt="foodItem.foodItemName" />
        <hr class="separator" />
      </div>
      <h1 class="food-name">{{ foodItem.foodItemName }}</h1>
      <div class="food-info">
        <div class="price-quantity">
          <p class="price">${{ totalPrice.toFixed(2) }}</p>
          <div class="quantity-controls">
            <span class="quantity">&times; {{ quantity }}</span>
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

    <div class="add-on-section">
      <h2>Add On</h2>
      <div v-for="addOn in addOns" :key="addOn.id" class="add-on-item">
        <span>{{ addOn.name }}</span>
        <span class="price"><span class="currency">$</span>{{ addOn.price }}</span>
        <div class="quantity-controls">
          <button @click="decreaseAddOnQuantity(addOn)">-</button>
          <span class="quantity">{{ addOn.quantity }}</span>
          <button @click="increaseAddOnQuantity(addOn)">+</button>
        </div>
      </div>
    </div>

    <div class="special-instructions-section">
      <h2>Special Instructions</h2>
      <textarea v-model="instructions" placeholder="Add any special requests"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoodItemPage',
  props: {
    foodItem: Object,
    merchant: Object,
    quantity: Number,
    totalPrice: Number,
    addOns: Array,
    modelValue: {
      type: String,
      default: ''
    }
  },
  computed: {
    instructions: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  },
  methods: {
    increaseQuantity() {
      this.$emit('increase-quantity')
    },
    decreaseQuantity() {
      this.$emit('decrease-quantity')
    },
    increaseAddOnQuantity(addOn) {
      addOn.quantity++
      this.$emit('updateAddOn', addOn)
    },
    decreaseAddOnQuantity(addOn) {
      if (addOn.quantity > 0) {
        addOn.quantity--
        this.$emit('updateAddOn', addOn)
      }
    }
  },
  mounted() {
    console.log(this.addOns)
  }
}
</script>

<style scoped>
.food-item-container {
  display: flex;
  flex-direction: column;
}

.left-column {
  flex: 1;
  padding-right: 0.78vw;
}

.food-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.42vw;
}

.food-name {
  font-size: 1.25vw;
  margin-top: 0.78vw;
  margin-bottom: 0.26vw;
}

.food-info {
  margin-top: 0.78vw;
}

.price-quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.52vw;
}

.price {
  font-size: 2.6vw;
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-btn {
  width: 2.6vw;
  height: 2.6vw;
  border-radius: 50%;
  background-color: #00adb5;
  border: none;
  color: #ffffff;
  font-size: 0.94vw;
  cursor: pointer;
  margin-left: 2.08vw;
}

.quantity {
  margin: 0 0.52vw;
  font-size: 1.56vw;
  margin-right: 5.21vw;
}

.separator {
  border: none;
  border-top: 0.26vw solid #000000;
  margin: 0.52vw 0;
}

.add-on-section {
  margin-top: 1.04vw;
}

.add-on-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.52vw;
}

.add-on-item .price {
  display: flex;
  align-items: center;
}

.currency {
  margin-right: 0.1vw;
}

.quantity-controls .quantity {
  font-size: 0.63vw;
  margin: 0 0.78vw;
  font-weight: bold;
  background-color: #eeffff;
  padding: 0.52vw;
  border-radius: 0.42vw;
}

.quantity-controls button {
  background-color: #eeffff;
  border: none;
  color: black;
  padding: 0.26vw;
  cursor: pointer;
  font-weight: bold;
}

.special-instructions-section {
  margin-top: 1.04vw;
}

textarea {
  width: 95%;
  padding: 0.52vw;
  font-size: 0.52vw;
  border-radius: 0.26vw;
  border: 0.052vw solid #00adb5;
}
</style>
