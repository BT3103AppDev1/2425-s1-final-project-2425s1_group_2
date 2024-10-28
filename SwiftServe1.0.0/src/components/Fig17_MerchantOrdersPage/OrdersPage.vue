<template>
<div id="orders-page">
    <div class = "title-orders"><strong>Orders Page</strong></div>
    <div id= "orders">
        <MReceipt
            v-for="order in orderData"
            :key="order.orderID"
            :orderID="order.orderID"
            :collectionState="order.collectionState"
            :orders="order.orders"
            :dineOption="order.dineOption"
            :diningTime="order.diningTime"
            :seats="order.seats"
            :buttonDisabled="order.buttonDisabled"
            :updateOrder="updateOrder"
        />
    </div>
</div>

</template>

<script>
import firebaseApp from '@/firebase.js';
import { getFirestore, getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { getAuth} from "firebase/auth";
const db = getFirestore(firebaseApp);

import MReceipt from '@/components/Fig17_MerchantOrdersPage/MReceipt.vue'

export default {
  name: 'OrdersPageComponent',

  data() {
    return {
    //   name: '',
    //   email: '',
      user: false,
      merchantId: '',
      orderData: [],
      orderNumMap: {}
    };
  },

  async mounted() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.merchantId = "6CrzYngTYekKWIkSmohR"; //to replace with user id
      }
    });

    this.orderData = await this.getOrderData();
  },

  methods: {
    async updateOrder(orderID, newState, disabled) {
      const order = this.orderData.find(o => o.orderID === orderID);
      if (order) {
        order.collectionState = newState;
        order.buttonDisabled = disabled;

        await this.updateCollected(orderID);
      }
    },

    async updateCollected(orderID) {
      const docIDs = this.orderNumMap[orderID];
      
      if (docIDs && docIDs.length > 0) {
        docIDs.map(docID => {
          const orderRef = doc(db, 'PlacedCustOrders', docID);
          return updateDoc(orderRef, { orderStatus: true });
        });
      }
    },

    async getOrderData() {
        let allOrders = await getDocs(collection(db, 'PlacedCustOrders'));
        let myOrders = [];

        allOrders.forEach((doc) => {
            const ord = doc.data();

            if (!ord.collected && ord.merchantId === this.merchantId) {
            let existingOrder = myOrders.find(order => order.orderID === (ord.OrderNum || ord.orderNum));

            const foodItem = {
                hawker: ord.hawkerCentre,
                stall: ord.merchantName,
                quantity: ord.quantity,
                dish: ord.foodItemName,
                price: ord.foodItemPrice,
                addOns: ord.addOns,
                specialInstruction: ord.specialInstructions || ""
            };

            if (existingOrder) {
                existingOrder.orders.push(foodItem);
                this.orderNumMap[existingOrder.orderID].push(doc.id);

            } else {
                let formattedOrder = {
                orderID: ord.OrderNum || ord.orderNum,
                collectionState: ord.orderStatus ? "Customer Incoming" : "Order Ready Collection",
                dineOption: ord.diningStatus,
                diningTime: ord.diningTime,
                buttonDisabled: ord.orderStatus,
                seats: ord.seats,
                orders: [foodItem]
                };

                myOrders.push(formattedOrder);

                this.orderNumMap[formattedOrder.orderID] = [doc.id];
            }
            }
        });

        return myOrders;
        }
  },
  components: {
    MReceipt,
  }
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  overflow-y: auto;
}

#orders-page {
  max-height: 80vh;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto; 
}

#orders {
  display: flex;
  flex-wrap: wrap;
  gap: 2vw;
  overflow-y: auto;
  margin-left: 2vw;
  
}

.title-orders {
    font-family: 'Inria Sans', sans-serif;
    font-size: 2vw;
    text-align: center;
    margin-bottom: 1vw;
}

</style>