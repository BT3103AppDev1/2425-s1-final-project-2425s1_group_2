<template>
  <HeaderScreen />
  <div class="container">
    <div class="food-item-details" v-if="(foodItem || cartItem || quickOrderItem) && merchant">
      <LeftColumn
        :merchant="merchant"
        :foodItem="cartItem || foodItem || quickOrderItem"
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
            <button @click="addToCartHandler()" class="modal-button">Yes, proceed to add</button>
            <button @click="closeAddToCartModal" class="modal-button">
              No, return back to food item
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderScreen from '@/components/FigX_UniversalHeader/UniversalHeader.vue'
import AddOn from '../components/Fig10_FoodItemPage/AddOn.vue'
import SpecialInstructions from '../components/Fig10_FoodItemPage/SpecialInstructions.vue'
import LeftColumn from '../components/Fig10_FoodItemPage/FoodItemLeftColumn.vue'
import { db } from '../firebase.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  components: {
    HeaderScreen,
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
      specialInstructions: '',
      user: null,
      cartItemId: null,
      cartItem: null,
      totalPrice: 0,
      hawkerCentre: null,
      showAddToCartModal: false,
      quickOrderItem: null
    }
  },
  async mounted() {
    this.hawkerCentre = this.$route.query.HCName || null

    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
      }
    })
  },
  async created() {
    const foodItemId = this.$route.params.id || null
    this.cartItemId = this.$route.params.cartItemId || null
    this.quickOrderId = this.$route.params.orderId || null
    if (this.cartItemId) {
      await this.fetchCartItem(this.cartItemId)
    } else if (foodItemId) {
      await this.fetchFoodItem(foodItemId)
    } else if (this.quickOrderId) {
      await this.fetchQuickOrderItem(this.quickOrderId)
    }
  },
  watch: {
    foodItem() {
      this.updateTotalPrice()
    }
  },
  methods: {
    // Modal control methods
    openAddToCartModal() {
      this.showAddToCartModal = true
    },
    closeAddToCartModal() {
      this.showAddToCartModal = false
    },
    async calculateTotalPrice() {
      const addOnTotal = this.addOns.reduce((total, addOn) => {
        return total + addOn.price * addOn.quantity
      }, 0)

      // Multiply both base price and add-on total by the quantity
      let basePrice = 0
      if (this.foodItem) {
        basePrice = this.foodItem.foodItemPrice
      } else if (this.cartItem) {
        const foodItemDoc = await db.collection('FoodItem').doc(this.cartItem.foodItemId).get()
        if (foodItemDoc.exists) {
          const foodItem = foodItemDoc.data()
          basePrice = foodItem.foodItemPrice
        }
      } else if (this.quickOrderItem) {
        const foodItemDoc = await db
          .collection('FoodItem')
          .doc(this.quickOrderItem.foodItemId)
          .get()
        if (foodItemDoc.exists) {
          const foodItem = foodItemDoc.data()
          basePrice = foodItem.foodItemPrice
        }
      }

      return (basePrice + addOnTotal) * this.quantity
    },
    async updateTotalPrice() {
      this.totalPrice = await this.calculateTotalPrice()
    },
    async fetchQuickOrderItem(quickOrderId) {
      try {
        const quickOrderItemDoc = await db.collection('PlacedCustOrders').doc(quickOrderId).get()
        if (quickOrderItemDoc.exists) {
          const quickOrderItem = quickOrderItemDoc.data()

          // Extract the foodItemId from the cart item
          const foodItemId = quickOrderItem.foodItemId

          // Fetch the original food item from FoodItem collection using the foodItemId
          const foodItemDoc = await db.collection('FoodItem').doc(foodItemId).get()
          let originalAddOns = []
          if (foodItemDoc.exists) {
            this.foodItem = foodItemDoc.data()

            originalAddOns = this.foodItem.addOn
              ? Object.keys(this.foodItem.addOn).map((key) => ({
                  name: key,
                  price: this.foodItem.addOn[key],
                  quantity: 0
                }))
              : []
          } else {
            console.error('No such food item!')
          }

          // Merge the original add-ons and the ones from the cart
          const mergedAddOns = originalAddOns.map((originalAddOn) => {
            const quickOrderAddOn = quickOrderItem.addOns.find(
              (addOn) => addOn.name === originalAddOn.name
            )
            return {
              ...originalAddOn,
              quantity: quickOrderAddOn ? quickOrderAddOn.quantity : 0 // Use cart quantity if available
            }
          })

          // Update cartItem object

          this.quickOrderItem = {
            userId: quickOrderItem.userId,
            foodItemName: quickOrderItem.foodItemName,
            foodItemPrice: quickOrderItem.foodItemPrice,
            hawkerCentre: this.hawkerCentre,
            foodItemId: quickOrderItem.foodItemId,
            foodItemImage: quickOrderItem.foodItemImage,
            quantity: quickOrderItem.quantity,
            addOns: mergedAddOns,
            specialInstructions: quickOrderItem.specialInstructions,
            merchantName: quickOrderItem.merchantName,
            merchantId: quickOrderItem.merchantId
          }

          // Update addOns and specialInstructions
          this.quantity = this.quickOrderItem.quantity
          this.addOns = this.quickOrderItem.addOns
          this.specialInstructions = this.quickOrderItem.specialInstructions

          // Fetch the merchant details
          await this.fetchMerchant(quickOrderItem.merchantId)

          this.totalPrice = this.quickOrderItem.foodItemPrice // Set total price
        } else {
          console.error('No such quick order item!')
        }
      } catch (error) {
        console.error('Error fetching quick order item:', error)
      }
    },
    async fetchFoodItem(foodItemId) {
      try {
        const foodItemDoc = await db.collection('FoodItem').doc(foodItemId).get()
        if (foodItemDoc.exists) {
          this.foodItem = {
            id: foodItemDoc.id,
            ...foodItemDoc.data()
          }
          await this.fetchMerchant(this.foodItem.merchantId)
          this.addOns = this.foodItem.addOn
            ? Object.keys(this.foodItem.addOn).map((key) => ({
                name: key,
                price: this.foodItem.addOn[key],
                quantity: 0
              }))
            : []
        } else {
          console.error('No such food item!')
        }
      } catch (error) {
        console.error('Error fetching food item:', error)
      }
    },
    async fetchMerchant(merchantId) {
      try {
        const merchantDoc = await db.collection('UserProfile').doc(merchantId).get()
        if (merchantDoc.exists) {
          this.merchant = merchantDoc.data()
        } else {
          console.error('No such merchant!')
        }
      } catch (error) {
        console.error('Error fetching merchant:', error)
      }
    },
    async fetchCartItem(cartItemId) {
      try {
        const cartItemDoc = await db.collection('Cart').doc(cartItemId).get()
        if (cartItemDoc.exists) {
          const cartItem = cartItemDoc.data()

          // Extract the foodItemId from the cart item
          const foodItemId = cartItem.foodItemId

          // Fetch the original food item from FoodItem collection using the foodItemId
          const foodItemDoc = await db.collection('FoodItem').doc(foodItemId).get()
          let originalAddOns = []
          if (foodItemDoc.exists) {
            const foodItem = foodItemDoc.data()
            originalAddOns = foodItem.addOn
              ? Object.keys(foodItem.addOn).map((key) => ({
                  name: key,
                  price: foodItem.addOn[key],
                  quantity: 0
                }))
              : []
          } else {
            console.error('No such food item!')
          }

          // Merge the original add-ons and the ones from the cart
          const mergedAddOns = originalAddOns.map((originalAddOn) => {
            const cartAddOn = cartItem.addOns.find((addOn) => addOn.name === originalAddOn.name)
            return {
              ...originalAddOn,
              quantity: cartAddOn ? cartAddOn.quantity : 0 // Use cart quantity if available
            }
          })

          // Update cartItem object

          this.cartItem = {
            userId: cartItem.userId,
            foodItemName: cartItem.foodItemName,
            foodItemPrice: cartItem.foodItemPrice,
            foodItemId: cartItem.foodItemId,
            foodItemImage: cartItem.foodItemImage,
            quantity: cartItem.quantity,
            addOns: mergedAddOns,
            specialInstructions: cartItem.specialInstructions,
            merchantName: cartItem.merchantName,
            merchantId: cartItem.merchantId
          }

          // Update addOns and specialInstructions
          this.quantity = this.cartItem.quantity
          this.addOns = this.cartItem.addOns
          this.specialInstructions = this.cartItem.specialInstructions

          // Fetch the merchant details
          await this.fetchMerchant(cartItem.merchantId)

          this.totalPrice = this.cartItem.foodItemPrice // Set total price
        } else {
          console.error('No such cart item!')
        }
      } catch (error) {
        console.error('Error fetching cart item:', error)
      }
    },
    increaseQuantity() {
      this.quantity++
      this.updateTotalPrice()
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
        this.updateTotalPrice()
      }
    },
    updateAddOn(updatedAddOn) {
      const addOnIndex = this.addOns.findIndex((a) => a.name === updatedAddOn.name)
      if (addOnIndex !== -1) {
        this.addOns[addOnIndex] = updatedAddOn
        this.updateTotalPrice()
      }
    },
    async addToCartHandler() {
      let cartItem = {}
      if (this.quickOrderItem) {
        cartItem = this.quickOrderItem
      } else {
        cartItem = {
          userId: this.user.uid,
          foodItemName: this.foodItem
            ? this.foodItem.foodItemName
            : this.cartItem
              ? this.cartItem.foodItemName
              : this.quickOrderItem.foodItemName,
          foodItemPrice: this.totalPrice,
          foodItemId: this.foodItem
            ? this.foodItem.id
            : this.cartItem
              ? this.cartItem.foodItemId
              : this.quickOrderItem.foodItemId,
          quantity: this.quantity,
          addOns: this.addOns.filter((addOn) => addOn.quantity > 0),
          specialInstructions: this.specialInstructions,
          merchantName: this.merchant.displayName,
          merchantId: this.merchant.uid,
          hawkerCentre: this.hawkerCentre,
          foodItemImage: this.foodItem
            ? this.foodItem.foodItemImage
            : this.cartItem
              ? this.cartItem.foodItemImage
              : this.quickOrderItem.foodItemImage
        }
      }
      this.quickOrderItem = null
      try {
        if (this.cartItemId) {
          await db.collection('Cart').doc(this.cartItemId).update(cartItem)
        } else {
          await db.collection('Cart').add(cartItem)
        }
        this.$router.push({
          path: '/hawkerCentre',
          query: { HCName: this.hawkerCentre }
        })
      } catch (error) {
        console.error('Error adding to cart:', error)
      }
    },
    cancelOrder() {
      this.$router.push({
        path: '/hawkerCentre',
        query: { HCName: this.hawkerCentre }
      })
    }
  }
}
</script>

<style scoped>
.container {
  font-family:
    Inria Sans,
    sans-serif;
  max-width: 1536px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  overflow-y: auto;
  height: 100vh;
}

/* 2xl */
@media (max-width: 1536px) {
  .container {
    max-width: 1280px;
  }
}

/* xl */
@media (max-width: 1280px) {
  .container {
    max-width: 1024px;
  }
}

/* lg */
@media (max-width: 1024px) {
  .container {
    max-width: 768px;
  }
}

/* md */
@media (max-width: 768px) {
  .container {
    max-width: 640px;
  }
}

/* sm */
@media (max-width: 640px) {
  .container {
    max-width: 475px;
  }
}

/* xs */
@media (max-width: 475px) {
  .container {
    width: 100%;
  }
}

.food-item-details {
  position: absolute;
  left: 5vw;
  top: 12vh;
  width: 45vw;
  display: flex;
  background-color: #ffffff;
  padding: 0.9375rem;
  flex-wrap: wrap;
}

.right-column {
  position: absolute;
  left: 50vw;
  top: 3vh;
  width: 40vw;
  height: 80vh;
  flex: 1;
  padding-left: 0.9375rem;
}

.green-box {
  background-color: #e6f7f5;
  border-radius: 0.5rem;
  padding: 0.9375rem;
  margin-bottom: 1rem;
  height: 500px;
}

.add-ons,
.special-instructions {
  margin-bottom: 1.25rem;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  align-items: flex-end;
}

.add-to-cart,
.cancel-order {
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border: none;
  font-size: 1.5rem;
  /* font-weight: 400; */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inria Sans', sans-serif;
  background-color: #00adb5;
  color: white;
}

.add-to-cart:hover,
.cancel-order:hover {
  background-color: #007a80;
}

.cart-icon,
.cancel-icon,
.cancel-order,
.add-to-cart {
  margin-right: 0.3125rem;
}

.separator {
  border: none;
  border-top: 5px solid black;
  margin: 0.625rem 0;
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

.modalbutton {
  font-family: 'Inria Sans', sans-serif;
}
</style>
