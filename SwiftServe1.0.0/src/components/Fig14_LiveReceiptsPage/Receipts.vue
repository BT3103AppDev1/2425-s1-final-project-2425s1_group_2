<template>
  <div class="receipt-container">
    <div class="receipt-scroll">
      <div v-for="receipt in receipts" :key="receipt.orderId" class="receipt">
        <h2 class="receipt-header">Receipt ID: {{ receipt.orderId }}</h2>
        <hr class="divider" />
        <div class="order-scroll">
          <div v-for="(order, index) in receipt.orders" :key="index" class="order">
            <h3>Order {{ index + 1 }}</h3>
            <p>{{ order.restaurant }}</p>
            <p>{{ order.item }}</p>
            <p>{{ order.quantity }} {{ order.type }}</p>
            <p>${{ order.price.toFixed(2) }}</p>
          </div>
          <p class="total">Total: ${{ calculateTotal(receipt.orders).toFixed(2) }}</p>
        </div>
        <hr class="divider" />
        <div class="order-details">
          <div class="detail-row">
            <span>Dine in / Takeaway:</span>
            <div class="detail-value">{{ receipt.dineIn }}</div>
          </div>
          <div class="detail-row">
            <span>Dining Time:</span>
            <div class="detail-value">{{ receipt.diningTime }}</div>
          </div>
          <div class="detail-row">
            <span>Seats:</span>
            <div class="detail-value">{{ receipt.seats }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'; // Import the Firebase Auth
//import { receipts } from './receipts.js'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

const db = getFirestore(firebaseApp)

export default {
  name: 'ReceiptComponent',
  data() {
    return {
      user: false,
      //receipts: receipts
      receipts: []
    }
  },
  mounted() {
      const auth = getAuth();
      if (auth.currentUser) {
        this.user = auth.currentUser.uid;
      }
      this.getAllOrders();
  },

  methods: {
    calculateTotal(orders) {
      return orders.reduce((total, order) => total + order.price, 0)
    },

    async getAllOrders() {
        const ordersCollection = collection(db, "PlacedCustOrders");
        const ordersQuery = query(ordersCollection, orderBy("orderNum"));
        let allOrders = await getDocs(ordersQuery)
        let manyReceipts = [];

        for (const docs of allOrders.docs) {
          let docsData = docs.data();
          let docUserID = docsData.userId;


          if (docUserID === this.user) {
            //console.log(docsData.receiptId);
            const existingOrder = manyReceipts.find(receipt => receipt.orderId === docsData.receiptId);

            if (existingOrder) {
              existingOrder.orders.push({
                restaurant: docsData.hawkerCentre,
                item: docsData.merchantName,
                quantity: String(docsData.quantity) + 'x',
                type: docsData.foodItemName,
                price: docsData.foodItemPrice
              })
            } else {
              manyReceipts.push({
                'orderId': docsData.receiptId,
                'dineIn':  docsData.diningStatus,
                'diningTime': docsData.diningTime,
                'seats': docsData.seats,
                'orders': [{
                  restaurant: docsData.hawkerCentre,
                  item: docsData.merchantName,
                  quantity: String(docsData.quantity) + 'x',
                  type: docsData.foodItemName,
                  price: docsData.foodItemPrice
                }]
              });
            }
          }
          this.receipts = manyReceipts;
          console.log(manyReceipts);
        }
    }
  }
}
</script>

<style scoped>
.receipt-container {
  position: absolute;
  top: 10vw;
  left: 40vw;
  width: 40vw;
  height: 38vw;
  background-color: #eeffff;
  overflow: auto;
  font-family: 'Inria Sans', sans-serif;
}

.receipt-scroll {
  padding: 0.5vw;
}

.receipt {
  margin-bottom: 0vw;
  background-color: #eeffff;
  padding: 0.5vw;
  border-radius: 0.5vw;
}

.receipt-header {
  color: black;
  font-size: 2.16vw;
  text-align: center;
}

.divider {
  border: none;
  border-top: 1px solid black;
  margin: 0vw 0;
}

.order-scroll {
  max-height: 20vw;
  overflow-y: auto;
}

.order h3 {
  color: #00adb5;
  font-size: 1.44vw;
}

.order p {
  margin: 0.2vw 0;
  font-size: 1.2vw;
}

.total {
  text-align: right;
  font-weight: bold;
  font-size: 1.44vw;
  margin-top: 0.5vw;
}

.order-details {
  margin-top: 1vw;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2vw;
  font-size: 1.2vw;
}

.detail-value {
  background-color: #00adb5;
  color: white;
  padding: 0.3vw 0.6vw;
  border-radius: 0.3vw;
  width: 30%;
  text-align: center;
}
</style>
