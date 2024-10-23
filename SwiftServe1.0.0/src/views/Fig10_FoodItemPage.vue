<template>
  <div class="food-item-page">
    <HeaderTag />
    <div class="food-item-details" v-if="(foodItem || cartItem) && merchant">
      <LeftColumn
        :merchant="merchant"
        :foodItem="cartItem ? cartItem : foodItem"
        :quantity="quantity"
        :totalPrice="totalPrice"
        @increaseQuantity="increaseQuantity"
        @decreaseQuantity="decreaseQuantity"
      />
 
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
          <button class="add-to-cart" @click="openAddToCartModal">
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
        <!-- Custom Modal for Confirming Item Removal -->
        <div v-if="showAddToCartModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="closeAddToCartModal">&times;</button>
        <div class="modal-text">
          <h2>Confirm Add to Cart</h2>
          <p>Are you sure you want to add this into your cart?</p>
          <div class="modal-actions">
            <button @click="addToCartHandler">Yes, proceed to add</button>
            <button @click="closeAddToCartModal">No, return back to food item</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTag from '../components/AppHeader.vue';
import AddOn from '../components/Fig10_FoodItemPage/AddOn.vue';
import SpecialInstructions from '../components/Fig10_FoodItemPage/SpecialInstructions.vue';
import LeftColumn from '../components/Fig10_FoodItemPage/FoodItemLeftColumn.vue'; 
import { db } from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
  components: {
    HeaderTag,
    AddOn,
    SpecialInstructions,
    LeftColumn 
  },
  data() {
    return {
      foodItem: null,
      merchant: null,
      quantity: 1,
      addOns: [],
      specialInstructions: "",
      user: null,
      cartItemId: null,
      cartItem: null,
      totalPrice: 0,
      hawkerCentre: false,
      showAddToCartModal: false
    };
  },
  async mounted() {
    this.hawkerCentre = this.$route.query.HCName || null;
    console.log(this.hawkerCentre);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          console.log("User is authenticated:", user);
        } 
    });
  },
  async created() {
    const foodItemId = this.$route.params.id || null;
    this.cartItemId = this.$route.params.cartItemId || null;
    if (this.cartItemId) {
      await this.fetchCartItem(this.cartItemId);
    }
    if (foodItemId) {
      await this.fetchFoodItem(foodItemId);
    }
  },
  watch: {
  // addOns: {
  //   handler() {
  //     this.updateTotalPrice();
  //   },
  //   deep: true
  // },
  // quantity() {
  //   this.updateTotalPrice();
  // },
  foodItem() {
    this.updateTotalPrice();
  },
  // cartItem() {
  //   this.updateTotalPrice();
  // }
  },
  methods: {
        // Modal control methods
        openAddToCartModal() {
      this.showAddToCartModal = true;
    },
    closeAddToCartModal() {
      this.showAddToCartModal = false;
    },
    async calculateTotalPrice() {
      const addOnTotal = this.addOns.reduce((total, addOn) => {
        return total + addOn.price * addOn.quantity;
      }, 0);

      // Multiply both base price and add-on total by the quantity
      let basePrice = 0;
      if (this.foodItem) {
        basePrice = this.foodItem.foodItemPrice; 
      } else if (this.cartItem) {
        const foodItemDoc = await db.collection('FoodItem').doc(this.cartItem.foodItemId).get();
        if (foodItemDoc.exists) {
          const foodItem = foodItemDoc.data();
          basePrice = foodItem.foodItemPrice; 
        }
      }

      return (basePrice + addOnTotal) * this.quantity;
    },
    async updateTotalPrice() {
      this.totalPrice = await this.calculateTotalPrice();
    },
    async fetchFoodItem(foodItemId) {
      try {
        const foodItemDoc = await db.collection('FoodItem').doc(foodItemId).get();
        if (foodItemDoc.exists) {
          this.foodItem = {
            id: foodItemDoc.id, 
            ...foodItemDoc.data()
          };
          //console.log('Fetched food item:', this.foodItem); // Log the fetched food item
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
          //console.log('Fetched merchant:', this.merchant); // Log the fetched merchant
        } else {
          console.error('No such merchant!');
        }
      } catch (error) {
        console.error('Error fetching merchant:', error);
      }
    },
    async fetchCartItem(cartItemId) {
      try {
        const cartItemDoc = await db.collection('Cart').doc(cartItemId).get();
        if (cartItemDoc.exists) {
          const cartItem = cartItemDoc.data();
          console.log('Fetched cart item:', cartItem); // Log the fetched cart item

          // Extract the foodItemId from the cart item
          const foodItemId = cartItem.foodItemId;

          // Fetch the original food item from FoodItem collection using the foodItemId
          const foodItemDoc = await db.collection('FoodItem').doc(foodItemId).get();
          let originalAddOns = [];
          if (foodItemDoc.exists) {
            const foodItem = foodItemDoc.data();
            originalAddOns = foodItem.addOn ? Object.keys(foodItem.addOn).map(key => ({
              name: key,
              price: foodItem.addOn[key],
              quantity: 0
            })) : [];
          } else {
            console.error('No such food item!');
          }

          // Merge the original add-ons and the ones from the cart
          const mergedAddOns = originalAddOns.map(originalAddOn => {
            const cartAddOn = cartItem.addOns.find(addOn => addOn.name === originalAddOn.name);
            return {
              ...originalAddOn,
              quantity: cartAddOn ? cartAddOn.quantity : 0 // Use cart quantity if available
            };
          });

          // Update cartItem object

          this.cartItem = {
            userId: cartItem.userId,
            foodItemName: cartItem.foodItemName,
            foodItemPrice: cartItem.foodItemPrice,
            foodItemId: cartItem.foodItemId,
            quantity: cartItem.quantity,
            addOns: mergedAddOns,
            specialInstructions: cartItem.specialInstructions,
            merchantName: cartItem.merchantName,
            merchantId: cartItem.merchantId
          };

          // Update addOns and specialInstructions
          this.quantity = this.cartItem.quantity;
          this.addOns = this.cartItem.addOns;
          this.specialInstructions = this.cartItem.specialInstructions;

          // Fetch the merchant details
          await this.fetchMerchant(cartItem.merchantId);

          this.totalPrice = this.cartItem.foodItemPrice; // Set total price
          console.log(this.totalPrice)
        } else {
          console.error('No such cart item!');
        }
      } catch (error) {
        console.error('Error fetching cart item:', error);
      }
    },
    increaseQuantity() {
      this.quantity++;
      this.updateTotalPrice();
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
        this.updateTotalPrice();
      }
    },
    updateAddOn(updatedAddOn) {
      const addOnIndex = this.addOns.findIndex(a => a.name === updatedAddOn.name);
      if (addOnIndex !== -1) {
        this.addOns[addOnIndex] = updatedAddOn;
        this.updateTotalPrice();
      }
    },
    async addToCartHandler() {
      //console.log('Food Item ID:', this.foodItem ? this.foodItem.id : this.cartItem.foodItemId);
      const cartItem = {
        userId: this.user.uid,
        foodItemName: this.foodItem ? this.foodItem.foodItemName : this.cartItem.foodItemName,
        foodItemPrice: this.totalPrice,
        foodItemId: this.foodItem ? this.foodItem.id : this.cartItem.foodItemId,
        quantity: this.quantity,
        addOns: this.addOns.filter(addOn => addOn.quantity > 0),
        specialInstructions: this.specialInstructions,
        merchantName: this.merchant.displayName,
        merchantId: this.merchant.uid,
        hawkerCentre: this.hawkerCentre
      };
      cartItem['OrderNum'] = cartItem.userId.substring(0, 3) + cartItem.merchantId.substring(0, 3) + cartItem.foodItemId.substring(0, 2) + String(cartItem.quantity).substring(0, 2);
      try {
        if (this.cartItemId) {
          await db.collection('Cart').doc(this.cartItemId).update(cartItem);
        } else {
          await db.collection('Cart').add(cartItem);
        }
        this.$router.push({
          path: '/hawkerCentre',
          query: {HCName: this.hawkerCentre}
        })
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    },
    cancelOrder() {
      this.$router.push({
        path: '/hawkerCentre',
        query: {HCName: this.hawkerCentre}
      })
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

.right-column {
  flex: 1;
  padding-left: 15px;
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
</style>