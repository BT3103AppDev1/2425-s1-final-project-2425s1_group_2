<template>
    <div class="receipt-container">
      <div class="receipt-header">
        <h2 id="receipt">Order ID: {{ orderID }}</h2>
      </div>
      <div class="order-items">
        <div v-for="(order, index) in orders" :key="index" class="order-item">
          <h3>Order {{ index + 1 }}</h3>
          <!-- <p>{{ order.stall }}</p> -->
          <p>{{ order.quantity }}x {{ order.dish }}</p>
          <!-- <p>${{ order.price.toFixed(2) }}</p> -->
          <p v-if="order.specialInstruction" id= "special-instruction"><strong>Special Instruction: {{ order.specialInstruction }}</strong></p>
          <br>
          <div v-if="order.addOns && order.addOns.length" id="add-ons">
            <strong>Add On</strong>
            <p v-for="(addOn, index) in order.addOns" :key="index">
              {{ addOn.quantity }} x {{ addOn.name }} <br>
              <!-- ${{ addOn.price.toFixed(2) }}  -->
            </p>
          </div>

        </div>
        <hr class="short-hr">
        <div id = "end"><strong>END</strong></div>
      </div>
      <div class="dine-details">
        <p>Dine In/Takeaway</p>
        <div class="dineOP">{{ dineOption }}</div>
        <p>Dining Time</p>
        <div class="dineTime">{{ diningTime }}</div>
        <p>Seats</p>
        <div class="seatsDetail">{{ seats }}</div>
      </div>

      <button class="collect-button" 
      :class="{ 'collectable-button': this.clicked === true }"
      @click="collectOrder">
      <strong>{{ collectionState }}</strong>
    </button>

    </div>
  </template>

<script>
// import firebaseApp from '../../firebase.js'
// import { getFirestore } from 'firebase/firestore'
// import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore'
// import { getAuth } from 'firebase/auth';

// const db = getFirestore(firebaseApp)

export default {

  name: 'ReceiptComponent',

  props: {
    orderID: String,
    collectionState: String,
    orders: Array,
    dineOption: String,
    diningTime: String,
    addons: Array,
    seats: Array,
    buttonDisabled: Boolean,
    updateOrder: Function,
    clicked: Boolean,
  },

  methods: {

      // collectOrder() {
      //   this.updateOrder(this.orderID, "Customer Incoming");
      //   // document.getElementById("collect-button").disabled = true;
      // },

      collectOrder() {
        let newState = "";
        let newClickedState = !this.clicked;

        // this.$emit('update-clicked', this.orderID, newClickedState);

        if (newClickedState) {
          newState = "Order Ready Collection"
        } else {
          newState = "Customer Incoming"
        }

        this.$emit('update-clicked', this.orderID, newClickedState, newState);

        // this.updateOrder(this.orderID, newState);
      },

  }
}
</script>

<style scoped>
.receipt-container {
  width: 40vh;
  display: flex;
  flex-direction: column;
  background-color: #eeffff;
  font-family: 'Inria Sans', sans-serif;
  font-size: 2vh;
  border-radius: 0.5vw;
  margin-left: 2vw;
}

.receipt-header {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid black;
  height: 4vw;
}

.receipt-header h2, .receipt-header p {
  margin: 0; /* Remove default margin */
  line-height: 1; /* Adjust line height for consistent vertical centering */
}

.order-items {
  max-height: 30vh;
  min-height: 30vh;
  overflow-y: auto;
  /* margin-top: 2vw;
  margin-bottom: 2vw; */
  padding-left: 1.5vw;
}

.order-item {
  background-color: #eeffff;
}

.order-item p {
  margin: 0px 0;
  line-height: 1;
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

.short-hr {
  width: 50%;
  margin: 0 auto;
  border: 1px solid black;
  margin-top: 1vw;
}

#end {
    text-align: center;
    margin-bottom: 1vw;
}

.collect-button {
  background-color: #FF2505;
  color: white;
  border: none;
  padding: 0.5vw;
  font-size: 1.25vw;
  border-radius: 1vw;
  width: 100%;
  font-family: 'Inria Sans', sans-serif;
  margin-top: auto;
}

.collect-button:not([disabled]):hover{
    background-image: linear-gradient(rgb(0 0 0/10%) 0 0);
}

.collect-button.collectable-button {
  background-color: #51E51C;
  color: black;
}

.dine-details {
  border-top: 2px solid black;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  grid-gap: 0.25vw;
  row-gap: 0.25vw;
  align-items: center;
  padding-top: 1vw;
  margin-bottom: 1vw;
}

.dine-details p {
  text-align: right;
  margin: 0.5vw;
}

.dineOP, .dineTime, .seatsDetail {
  text-align: left;
  background-color: #00adb5;
  margin-right: 2.5vw;
  border-radius:0.75vw;
  color: white;
  padding: 0.5vw;
  min-height: 1vw;

  margin-right: 1vw;
}

#special-instruction {
  color: #00adb5;
}


</style>

