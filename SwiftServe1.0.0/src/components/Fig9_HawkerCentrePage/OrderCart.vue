<template>
  <div class="order-cart">
    <h2>Order Cart</h2>
    <div class="cart-items-container">
      <div v-if="items.length === 0" class="empty-cart-message">
        Your cart is empty
      </div>
      <div v-else class="cart-items-row">
        <div v-for="item in items" :key="item.id" class="cart-item" @click="editItem(item)">
          <button @click.stop="removeItem(item.id)" class="remove-item-btn" aria-label="Remove item">
            ✕
          </button>
          <div class="cart-item-details">
            <h3>{{ item.merchantName }}</h3>
            <p class="food-item-name">{{ item.foodItemName }} x {{ item.quantity }}</p>
            <p class="food-item-price">${{ item.foodItemPrice.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderCart',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    editItem(item) {
      this.$emit('edit-item', item);
    },
    removeItem(itemId) {
      this.$emit('remove-item', itemId);
    }
  }
};
</script>

<style scoped>
.order-cart {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
}

.order-cart h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.cart-items-container {
  display: flex;
  flex-direction: column;
}

.cart-items-row {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 10px;
}

.empty-cart-message {
  text-align: center;
  color: #666;
  padding: 20px 0;
}

.cart-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #00ADB5;
  border-radius: 8px;
  padding: 15px;
  margin-right: 10px;
  min-width: 200px;
  width: 200px;
  position: relative;
}

.cart-item-details {
  text-align: left;
  width: 100%;
  margin-top: 15px;
}

.cart-item-details h3 {
  font-size: 1rem;
  margin: 0 0 10px 0;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-details p {
  font-size: 0.9rem;
  color: white;
  margin: 0 0 5px 0;
}

.food-item-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.food-item-price {
  font-weight: bold;
}

.remove-item-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 600px) {
  .cart-items-row {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .cart-item {
    width: calc(50% - 5px);
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>