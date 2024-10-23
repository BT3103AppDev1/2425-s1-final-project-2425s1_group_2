<template>
  <div class="order-cart">
    <h2>Order Cart</h2>
    <div class="cart-items-container">
      <div v-if="items.length === 0" class="empty-cart-message">
        Your cart is empty
      </div>
      <div v-else class="cart-items-row">
        <div v-for="item in items" :key="item.id" class="cart-item" @click="editItem(item)">
          <button @click.stop="confirmRemoveItem(item)" class="remove-item-btn" aria-label="Remove item">
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

    <!-- Custom Modal for Confirming Item Removal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="closeDeleteModal">&times;</button>
        <div class="modal-text">
          <h2>Confirm Cart Deletion</h2>
          <p>Are you sure you want to delete your cart?</p>
          <div class="modal-actions">
            <button @click="removeItem">Yes</button>
            <button @click="closeDeleteModal">Go back to ordering</button>
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
  data() {
    return {
      showDeleteModal: false,  // Controls the modal visibility
      itemToRemove: null       // Stores the item to be removed
    };
  },
  methods: {
    editItem(item) {
      this.$emit('edit-item', item);
    },
    confirmRemoveItem(item) {
      this.itemToRemove = item;
      this.showDeleteModal = true;
    },
    removeItem() {
      if (this.itemToRemove) {
        this.$emit('remove-item', this.itemToRemove.id);
        this.closeDeleteModal();
      }
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.itemToRemove = null; // Reset itemToRemove when modal is closed
    }
  }
};
</script>

<style scoped>
/* Original Order Cart CSS */
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

/* Original responsive styles */
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
