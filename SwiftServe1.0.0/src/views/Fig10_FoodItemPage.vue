<template>
  <div class="food-item-page">
    <HeaderTag />
    <div class="food-item-details" v-if="foodItem && merchant">
      <div class="left-column">
        <h1 class="food-stall">{{ merchant.displayName }}</h1>
        <div class="food-image">
          <img :src="foodItem.foodItemImage" :alt="foodItem.foodItemName">
          <hr class="separator"> 
        </div>
        <h1 class="food-name">{{ foodItem.foodItemName }}</h1>
        <div class="food-info">
          <div class="price-quantity">
            <p class="price">${{ totalPrice.toFixed(2) }}</p>
            <div class="quantity-controls">
              <span class="quantity">× {{ quantity }}</span>
              <button @click="decreaseQuantity" class="quantity-btn" aria-label="Decrease quantity">-</button>
              <button @click="increaseQuantity" class="quantity-btn" aria-label="Increase quantity">+</button>
            </div>
          </div>
        </div>
      </div>

      <div class="right-column">
        <div class="green-box">
          <div v-if="addOns.length > 0" class="add-ons"> 
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
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import HeaderTag from '../components/AppHeader.vue';
import AddOn from '../components/Fig10_FoodItemPage/AddOn.vue';
import SpecialInstructions from '../components/Fig10_FoodItemPage/SpecialInstructions.vue';
import { db } from '../firebase.js';

export default {
  components: {
    HeaderTag,
    AddOn,
    SpecialInstructions
  },
  data() {
    return {
      foodItem: null,
      merchant: null,
      quantity: 1,
      addOns: [],
      specialInstructions: "",
      addToCart: null
    };
  },
  async created() {
    const foodItemId = this.$route.params.id;
    await this.fetchFoodItem(foodItemId);
  },
  computed: {
    totalPrice() {
      const addOnTotal = this.addOns.reduce((total, addOn) => {
        return total + addOn.price * addOn.quantity;
      }, 0);

      return (this.foodItem.foodItemPrice + addOnTotal) * this.quantity;
    }
  },
  methods: {
    async fetchFoodItem(foodItemId) {
      try {
        const foodItemDoc = await db.collection('FoodItem').doc(foodItemId).get();
        if (foodItemDoc.exists) {
          this.foodItem = foodItemDoc.data();
          await this.fetchMerchant(this.foodItem.merchantId);
          this.addOns = this.foodItem.addOn ? Object.keys(this.foodItem.addOn).map(key => ({
            name: key,
            price: this.foodItem.addOn[key],
            quantity: 0
          })) : [];
        } else {
          console.error('No such food item!');
        }
      } catch (error) {
        console.error('Error fetching food item:', error);
      }
    },
    async fetchMerchant(merchantId) {
      try {
        const merchantDoc = await db.collection('UserProfile').doc(merchantId).get();
        if (merchantDoc.exists) {
          this.merchant = merchantDoc.data();
        } else {
          console.error('No such merchant!');
        }
      } catch (error) {
        console.error('Error fetching merchant:', error);
      }
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    updateAddOn(updatedAddOn) {
      const addOnIndex = this.addOns.findIndex(a => a.name === updatedAddOn.name);
      if (addOnIndex !== -1) {
        this.addOns[addOnIndex] = updatedAddOn;
      }
    },
    addToCartHandler() {
      // Handle adding to cart
      const cartItem = {
        ...this.foodItem,
        quantity: this.quantity,
        addOns: this.addOns.filter(addOn => addOn.quantity > 0),
        specialInstructions: this.specialInstructions
      };

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
  margin-top: 15px;
  margin-bottom: 5px;
}

.food-info {
  margin-top: 15px;
}

.price-quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
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
  background-color: #00A895;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-left: 40px;
}

.quantity {
  margin: 0 10px;
  font-size: 30px;
  margin-right: 100px;
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
  font-size: 14px;
  cursor: pointer;
  width: 25%;
  display: flex;
}

.add-to-cart {
  background-color: #00A895;
  color: white;
}

.cancel-order {
  background-color: #00A895;
  color: white;
}

.cart-icon, .cancel-icon, .cancel-order, .add-to-cart {
  margin-right: 5px;
}

.separator { 
  border: none; 
  border-top: 5px solid black;
  margin: 10px 0; 
}
</style>-