<template>
  <div class="order-cart">
    <p class="order-cart-text">Order Cart</p>
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
            <img :src="item.foodItemImage" :alt="item.foodItemName" />
            <h3>{{ item.hawkerCentre }}</h3>
            <h3>{{ item.merchantName }}</h3>
            <p class="food-item-name">{{ item.quantity }} x {{ item.foodItemName }}</p>
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
          <p>Are you sure you want to delete this item from your cart?</p>
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
.order-cart {
  border-radius: 0.5vw; 
  padding: 1vh 1vw; 
  max-width: 70vw; 
  height: 30vh;
  /* overflow-y: auto;  */
}

.order-cart-text {
  font-size: 1.5vw; 
  margin-bottom: 0.5vh; 
  font-weight: bold;
  color: #333;
  padding: 0;
}

.cart-items-container {
  display: flex;
  flex-direction: column;
  border: 0.3vh solid #00ADB5;
  border-radius: 0.8vw; 
  padding: 1vh;
}

.cart-items-row {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto; 
}

.empty-cart-message {
  text-align: center;
  color: #666;
  padding: 3vh 0; 
}

.cart-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #00ADB5;
  border-radius: 0.8vw;
  padding: 0.5vh;
  margin-right: 1vw;
  height: 20vh;
  width: 8vw; 
  position: relative;
  cursor: pointer;
}

.cart-item:hover {
  background-color: #007b83; /* Darkens on hover */
}

.cart-item-details {
  text-align: center;
  width: 100%;
}

.cart-item-details h3 {
  font-size: 0.8vw;
  margin: 0.5vh;
  padding: 0;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-details img {
  width: 5vw;
  height: 5vw;
  border-radius: 0.5vw;
  margin-bottom: 1vh;
}

.cart-item-details p {
  font-size: 0.7vw;
  color: white;
  margin: 0.2vh 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  top: 0.5vh;
  right: 0.5vw;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 2vh;
  height: 2vh;
  font-size: 1.2vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-item-btn:hover {
  background-color: white;
  color: red;
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
