<template>
  <div class="receipt-container">
    <div class="receipt-header">
      <h2 id="receipt">Receipt</h2>
      <img src="/RedCross.png" alt="Go Back" class="cancel" @click="goHawkerCentre"/>
      <!--<router-link to="/hawkercentre">
      </router-link>-->
    </div>
    <div class="order-items">
      <div v-for="(order, index) in orders" :key="index" class="order-item">
        <div class="order-list">
          <div id="top">
            <h3>Order {{ index + 1 }}</h3>
            <p>{{ order.hawker }}</p>
            <p>{{ order.stall }}</p>
            <p>{{ order.quantity }}x {{ order.dish }}</p>
            <p>${{ order.price.toFixed(2) }}</p>
          </div>
          <button class="edit-button" @click="goOrdersPage(order)">Edit</button>
        </div>
      </div>
    </div>


    <div class="total">
      <h3 id="TotalPrice">Total: ${{ total.toFixed(2) }}</h3>
    </div>
    <div class="options">
      <div class="option">
        <label for="dine-option">Dine in / Takeaway:</label>
        <select id="dine-option" v-model="dineOption">
          <option>Dine in</option>
          <option>Takeaway</option>
        </select>
      </div>
      <div class="option">
        <label for="time-option">Dining Time:</label>
        <select id="time-option" v-model="diningTime">
          <option>12:00pm - 12:30pm</option>
          <option>12:30pm - 1:00pm</option>
          <option>1:00pm - 1:30pm</option>
          <option>1:30pm - 2:00pm</option>
        </select>
      </div>
    </div>
    <div class="payment-mode">
      <h3>Payment Mode:</h3>
      <div class="payment-options">
        <img 
          v-for="(method, index) in paymentMethods" 
          :key="index" 
          :src="method.src" 
          :alt="method.alt" 
          :class="{ selected: selectedMethod === method.alt }" 
          @click="selectMethod(method.alt)"
        />
        <!--<img src="/visamaster.png" alt="Visa/Mastercard" />
        <img src="/paynow.png" alt="PayNow" />
        <img src="/paylah.png" alt="PayLah!" />-->
      </div>
    </div>
    <!--<router-link to = "/payment">-->
    <button class="confirm-button" @click="goPaymentSuccess">Confirm and Pay</button>
    <!--</router-link>-->

        <!-- Custom Modal for No Payment Selected -->
        <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-text">
          <h2>Notification</h2>
          <p>No Payment Method Selected. Please select one before proceeding</p>
          <div class="modal-actions">
            <button @click="closeDeleteModal">Go back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

const db = getFirestore(firebaseApp)

export default {

  name: 'ReceiptComponent',

  data() {
    return {
      selectedMethod: null, // Track the selected method
      paymentMethods: [
        { src: '/visamaster.png', alt: 'Visa/Mastercard' },
        { src: '/paynow.png', alt: 'PayNow' },
        { src: '/paylah.png', alt: 'PayLah!' }
      ],
      showDeleteModal: false,
      orders: [],
      dineOption: 'Dine in',
      diningTime: '12:00pm - 12:30pm',
      user: false,
      HCName: false
    }
  },

  async mounted() {
    this.HCName = this.$route.query.HCName;
    console.log(this.HCName)

    const auth = getAuth();
    this.user = auth.currentUser.uid;;
    await this.getCartOrders(this.user)
    console.log(this.orders);
  },

  computed: {
    total() {
      return this.orders.reduce((sum, order) => sum + order.price, 0)
    }
  },
  methods: {
      async goPaymentSuccess() {

        if (this.selectedMethod == null) {
          this.showDeleteModal = true;
          return;
        }

        let allOrders = await getDocs(collection(db, 'Cart'))

        //allOrders.forEach((docs) => {
        const receiptID = Date.now();
        for (const docs of allOrders.docs) {
          let docsData = docs.data();
          let docUserID = docsData.userId;

          if (docUserID === this.user) {
            docsData.receiptId = receiptID;
            docsData.orderNum = String(docUserID.substring(0, 3) + Date.now());
            docsData.collected = false;
            docsData.diningStatus = this.dineOption;
            docsData.diningTime = this.diningTime;
            docsData.orderStatus = false;
            docsData.paymendMode = this.selectedMethod;
            docsData.seats = "";
            await setDoc(doc(db, 'Cart', docs.id), docsData)
          }
          if (this.dineOption === "Dine in") {
            this.$router.push('/paymentSuccess');
          } else {
            docsData.dateCreated = new Date().toISOString();
            await setDoc(doc(db, 'PlacedCustOrders', docs.id), docsData)
            await deleteDoc(doc(db, 'Cart', docs.id));
            this.$router.push('/takeawaySuccess');
          }
        }
        //add method to clear cart in hawker centre page
      },
      closeDeleteModal() {
      this.showDeleteModal = false;
    },

      goHawkerCentre() {
        //this.$router.push('/hawkerCentre')
        this.$router.push({
          path: '/hawkerCentre',
          query: {HCName: this.HCName}
        })
      },

      goOrdersPage(order) {

        this.$router.push({
          name: 'foodItemPage',
          params: {
            cartItemId: order.id,  // Pass the cart item ID
          },
          query: {
            HCName: this.HCName
          }
        });
      },

      selectMethod(method) {
        this.selectedMethod = method; 
      },

      async getCartOrders(userID) {
        let allOrders = await getDocs(collection(db, 'Cart'))

        allOrders.forEach((docs) => {
          let docsData = docs.data()
          let docUserID = docsData.userId;

          if (docUserID === userID) {
            let newOrder = {
              id: docs.id,
              hawker: docsData.hawkerCentre,
              stall: docsData.merchantName,
              quantity: docsData.quantity,
              dish: docsData.foodItemName,
              price: docsData.foodItemPrice
            };
            this.orders.push(newOrder);
          }



        })
      }
  }
}
</script>

<style scoped>
.receipt-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  background-color: #eeffff;
  font-family: 'Inria Sans', sans-serif;
  margin-left: 25vw;
  font-size: 2vh;
}

.receipt-header {
  display: flex;
  text-align: center;
  margin-bottom: 2vh;
  border-bottom: 2px solid black;
}

#receipt {
  margin-left: 17vw;
}

.cancel {
  width: 5vh;
  height: 5vh;
  margin-top: 2vh;
  margin-left: 10vw;
}

.order-items {
  max-height: 25vh;
  overflow-y: auto;
  
}

#TotalPrice {
  font-size: 4vh;
}

.order-item {
  background-color: #eeffff;
}

.order-item p {
  margin: 0px 0;
  line-height: 1;
}

.order-list {
  display: flex; 
  justify-content: space-between; 
  align-items: center;
}

.edit-button {
  background-color: #00adb5;
  color: white;
  border: none;
  padding: 0.5vw 2vw;
  border-radius: 3px;
  font-size: 2vw;
  margin-right: 1vw;
  margin-top: 3vw;
}

.total {
  text-align: right;
  border-bottom: 2px solid black;
  font-weight: bold;
  margin-bottom: 2vh; /* Add margin to create space between total and dropdowns */
}

.option {
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
}

.option label {
  flex: 0 0 14vw;
  margin-right: 2vw;
  font-size: 2vh;
  font-weight: bold;
  text-align: right;
}

select {
  width: 15vw;
  padding: 5px;
  font-size: 1em;
  font-family: 'Inria Sans', sans-serif;
  border: none;
  border-radius: 10px;
  background-color: #00adb5;
  color: #ffffff;
}

.payment-mode {
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
}

.payment-mode h3 {
  flex: 0 0 12vw;
  margin-right: 1vw;
  font-weight: bold;
  font-size: 2vh;
  text-align: right;
}

.payment-options {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.payment-options img {
  height: 4vh;
  width: auto;
  margin-right: 1vw;
}

.payment-options img:hover {
  border: 2px solid #00adb5;
}

.payment-options img.selected {
  border: 2px solid #00adb5;
}

.confirm-button {
  background-color: #00adb5;
  color: white;
  border: none;
  padding: 10px;
  font-size: 3vh;
  border-radius: 5px;
  width: 100%;
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
  font-weight: bold;
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