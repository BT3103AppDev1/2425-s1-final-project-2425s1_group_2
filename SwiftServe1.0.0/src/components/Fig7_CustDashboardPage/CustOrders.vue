<!-- this is the main file for figure 7!-->
<!-- additional future features;
          greying out
          buttons 
          bring the order ready button, new order button, preparing order button and quick order button to javascript-->

<script>
import firebaseApp from '../../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'; // Import the Firebase Auth
import { collection, getDocs } from 'firebase/firestore'
  //import { currentOrders } from './currentOrders.js';
  //import { past5Orders } from './pastOrders.js';

  const db = getFirestore(firebaseApp)
  
  export default {
    name: 'CustOrders',
  
    data() {
      return {
        user: false,
        currentOrders: [],  // Reference to currentOrders data imported
        //past5Orders,    // Reference to past5Orders data imported
      };
    },
  
    mounted() {
      const auth = getAuth();
      if (auth.currentUser) {
        this.user = auth.currentUser.uid;
      }
      this.getCurrentOrders(this.user);
    },
  
    methods: {
      goToDiningOptions() {
        this.$router.push('/diningOptions');
      },
  
      async getCurrentOrders(userId) {
        let allOrders = await getDocs(collection(db, 'PlacedCustOrders'))

        for (const docs of allOrders.docs) {
          let docsData = docs.data();
          let docUserID = docsData.userId;

          if (docUserID === this.user) {
            let temp = {};
            temp['restaurant'] = docsData.hawkerCentre;
            temp['dish'] = docsData.merchantName;
            temp['quantity'] = String(docsData.quantity + 'x ' + docsData.foodItemName)
            temp['readyForCollection'] = docsData.orderStatus ? 1 : 0;
            temp['preparingOrder'] = docsData.orderStatus;
            this.currentOrders.push(temp);
          }
        }

        // Implement your logic here to get current orders for the user
        console.log(`Fetching current orders for user: ${userId}`);
        // Simulate fetching data (replace with actual API request logic)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
  
      scrollLeft() {
        if (this.$refs.ordersScroll) {
          this.$refs.ordersScroll.scrollBy({
            left: -this.$refs.ordersScroll.querySelector('.order-box').offsetWidth * 1.5, // Move by 1.5 cards' width
            behavior: 'smooth',
          });
        }
      },
  
      scrollRight() {
        if (this.$refs.ordersScroll) {
          this.$refs.ordersScroll.scrollBy({
            left: this.$refs.ordersScroll.querySelector('.order-box').offsetWidth * 1.5, // Move by 1.5 cards' width
            behavior: 'smooth',
          });
        }
      },
    },
  };
</script>

<template>
  <div class="food-ordering-system">
    <div class="current-placed-orders">
      <h2>Current Placed Orders</h2>
      <div class="orders-container">
        <button class="scroll-button left" @click="scrollLeft">&lt;</button>
        <div class="orders-scroll" ref="ordersScroll">
          <div v-for="(order, index) in currentOrders" :key="index" class="order-box">
            <img :src="order.image" :alt="order.restaurant" class="order-image" />
            <div class="order-details">
              <p>{{ order.restaurant }}</p>
              <p>{{ order.dish }}</p>
              <p>{{ order.quantity }}</p>
              <button 
                v-if="order.readyForCollection === 0" 
                class="order-ready-btn"
              >
                Order Ready Collection
              </button>
              <button 
                v-else-if="order.preparingOrder" 
                class="preparing-order-btn"
              >
                Preparing Order
              </button>
              <button v-if="order.readyForCollection === 0" class="view-order-btn">View Order Number</button>
            </div>
          </div>
        </div>
        <button class="scroll-button right" @click="scrollRight">&gt;</button>
      </div>
    </div>
    <div class="new-order">
      <div class="new-order-circle">
        <span class="plus-sign">+</span>
      </div>
      <p>New Order</p>
    </div>
    <div class="past-orders">
      <h2>Past Orders</h2> 
      <div class="past-orders-container">
        <div v-for="(order, index) in past5Orders" :key="index" class="past-order-box">
          <img :src="order.image" :alt="order.restaurant" class="past-order-image" />
          <p class="past-order-restaurant">{{ order.restaurant }}</p>
          <button @click="quickOrder(order)" class="quick-order-btn">Quick Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.food-ordering-system {
  position: relative;
  width: 100vw;
  height: 56.25vw; /* Aspect ratio 16:9 for the container */
  background-color: #FFFFFF;
  font-family: 'Inria Sans', sans-serif;
}

.current-placed-orders {
  position: absolute;
  top: 1vw; /* Adjusted top spacing for alignment */
  left: 3vw;
  width: 70vw;
  height: 20vw; 
  border: 0.15vw solid #00ADB5;
  border-radius: 0.8vw;
  overflow: hidden; /* Hides the vertical scrollbar */
  font-family: 'Inria Sans', sans-serif;
}

h2 {
  margin: 1vw 0; /* Adjusted to add more spacing */
  padding-left: 1.5vw; /* More padding to make the title visually aligned */
  color: #00ADB5;
  font-size: 2vw; /* Increased size for more emphasis */
  font-weight: bold;
  font-family: 'Inria Sans', sans-serif;
}

.orders-container {
  position: relative;
  height: calc(100% - 4vw); /* Spacing between title and orders increased */
}

.orders-scroll {
  display: flex;
  overflow-x: hidden; /* Hide horizontal scroll by default */
  scroll-behavior: smooth;
  height: 100%;
  padding: 0 1vw; 
  margin-left: 5vw;
}

.order-box {
  flex: 0 0 auto;
  width: 10vw;
  height: 18vh;
  margin-right: 0.42vw;
  background-color: #393E46;
  border-radius: 0.42vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.42vw;
  color: #FFFFFF;
  box-shadow: 0 0.42vw 0.84vw rgba(0, 0, 0, 0.15);
  font-family: 'Inria Sans', sans-serif;
  border-radius: 20px;
  margin-top: 2vh;
}

.order-image {
  width: 3.34vw; /* Reduced width by 20% */
  height: 3.34vw; /* Reduced height by 20% */
  object-fit: cover;
  border-radius: 0.21vw; /* Reduced radius by 20% */
}

.order-details {
  text-align: center;
}

.order-details p {
  margin: 0.083vw 0;
  font-size: 0.5vw; /* Reduced font size by 20% */
}

button {
  border: none;
  border-radius: 0.21vw; /* Reduced radius by 20% */
  padding: 0.21vw 0.42vw; /* Reduced padding by 20% */
  margin-top: 0.21vw;
  cursor: pointer;
  font-size: 0.5vw; /* Reduced font size by 20% */
  color: #FFFFFF;
}

/*button:hover {
  background-color: #007A80;
}*/


.order-ready-btn {
  background-color: #51e51c;
  color: black;
  height: 1.5vh;
  width: 8vw;
  font-size: 0.9vh;
  margin-top: 1vh;
  margin-bottom: 0.5vh;
  display: block;
}

.order-ready-btn:hover {
  background-color: #3cb516; /* Darker version for hover */
}

.preparing-order-btn {
  background-color: #D9D9D9;
  color: #000000;
  height: 4vh;
  width: 8vw;
  border-radius: 5px;
  font-size: 1.4vh;
  margin-bottom: 1vh;
}

.preparing-order-btn:hover {
  background-color: #9f9e9e;
}

.order-ready-btn:hover {
  background-color: #3cb516; /* Darker version for hover */
}

.view-order-btn {
  background-color: #007A80;
  color: #FFFFFF;
  height: 1.5vh;
  width: 8vw;
  font-size: 0.9vh;
  margin-top: 0;
  display: block;
  margin-bottom: 1vh;
}

.view-order-btn:hover {
  background-color: #014346; /* Darker version for hover */
}

.scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  color: black;
  border: none;
  border-radius: 50%;
  width: 3.75vw;
  height: 3.75vw;
  font-size: 4vw;
  font-weight: 200;
  cursor: pointer;
  z-index: 1;
}

.scroll-button.left {
  left: 1vw;
}

.scroll-button.right {
  right: 1vw;
}

.new-order {
  position: absolute;
  top: 3vw; 
  left: 80vw;
  width: 12vw;
  height: 15vw;
  background-color: #00ADB5;
  border-radius: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  cursor: pointer;
  box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.1);
}

.new-order p {
  font-size: 2vw;
  font-weight: 900;
  margin: 0;
}

.new-order-circle {
  width: 8vw; 
  height: 8vw; 
  background-color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5vw; 
}

.plus-sign {
  color: #00ADB5;
  font-size: 8vw;
  font-weight: 600;
}

.new-order:hover {
  background-color: #007A80;
}

/* Past Orders Styles */
.past-orders {
  position: absolute;
  top: 22vw;
  left: 3vw;
  width: 94vw; 
  height: 16vw;
}

.past-orders-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.past-order-box {
  width: 14.4vw;
  height: 12.8vw;
  background-color: #FFFFFF;
  border-radius: 0.64vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.8vw; /* Reduced padding by 20% */
  box-shadow: 0 0.16vw 0.32vw rgba(0, 0, 0, 0.1); /* Reduced shadow dimensions by 20% */
}

.past-order-image {
  width: 12.8vw; /* Reduced width by 20% */
  height: 8vw; /* Reduced height by 20% */
  object-fit: cover;
  border-radius: 0.32vw; /* Reduced radius by 20% */
}

.past-order-restaurant {
  font-size: 0.8vw; /* Reduced font size by 20% */
  font-weight: bold;
  margin: 0.4vw 0; /* Reduced margin by 20% */
  text-align: center;
}

.quick-order-btn {
  background-color: #00ADB5;
  color: #FFFFFF;
  border: none;
  border-radius: 0.32vw; /* Reduced border radius by 20% */
  padding: 0.4vw 0.8vw; /* Reduced padding by 20% */
  font-size: 0.64vw; /* Reduced font size by 20% */
  cursor: pointer;
  transition: background-color 0.3s;
}

.quick-order-btn:hover {
  background-color: #007A80;
}
</style>