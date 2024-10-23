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
        <h3>Order {{ index + 1 }}</h3>
        <p>{{ order.hawker }}</p>
        <p>{{ order.stall }}</p>
        <p>{{ order.quantity }}x {{ order.dish }}</p>
        <p>${{ order.price.toFixed(2) }}</p>
        <!--<button class="edit-button">Edit</button>-->
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
      /*orders: [
        {
          hawker: 'Bukit Canberra Hawker Centre',
          stall: 'Chin Lee Chicken Rice',
          quantity: 1,
          dish: 'Chicken Rice Set',
          price: 6.99
        },
        {
          hawker: 'Bukit Canberra Hawker Centre',
          stall: 'Wang Dao Kolo Mee',
          quantity: 1,
          dish: 'Kolo Mee Set',
          price: 3.61
        },
        {
          hawker: 'Bukit Canberra Hawker Centre',
          stall: 'Wang Dao Kolo Mee',
          quantity: 1,
          dish: 'Kolo Mee Set',
          price: 3.61
        },
        {
          hawker: 'Bukit Canberra Hawker Centre',
          stall: 'Wang Dao Kolo Mee',
          quantity: 1,
          dish: 'Kolo Mee Set',
          price: 3.61
        }
      ]*/
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
          alert("No Payment Method Selected.")
          return;
        }

        let allOrders = await getDocs(collection(db, 'Cart'))

        //allOrders.forEach((docs) => {
        for (const docs of allOrders.docs) {
          let docsData = docs.data();
          let docUserID = docsData.userId;

          if (docUserID === this.user) {
            docsData.collected = false;
            docsData.diningStatus = this.dineOption;
            docsData.diningTime = this.diningTime;
            docsData.orderStatus = "Preparing";
            docsData.paymendMode = this.selectedMethod;
            await setDoc(doc(db, 'Cart', docs.id), docsData)
          }
          if (this.dineOption === "Dine in") {
            this.$router.push('/paymentSuccess');
          } else {
            await setDoc(doc(db, 'PlacedCustOrders', docs.id), docsData)
            await deleteDoc(doc(db, 'Cart', docs.id));
            this.$router.push('/takeawaySuccess');
        }
        }

        //add method to clear cart in hawker centre page
      },

      goHawkerCentre() {
        //this.$router.push('/hawkerCentre')
        this.$router.push({
        path: '/hawkerCentre',
        query: {HCName: this.HCName}
      })
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

/*.edit-button {
  position: absolute;
  right: 10px;
  top: 50px;
  background-color: #00adb5;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 3px;
  font-size: 24px;
}*/

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
</style>
