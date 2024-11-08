<template>
  <div class="checkout-area">
    <p class="totalAmount">Total Amount: ${{ totalAmount }}</p>
    <div class="button-container">
      <button @click="checkout"><span class="cart-icon">🛒</span>Checkout</button>
      <button @click="cancelOrder"><span class="cancel-icon">❌</span>Cancel Order</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutArea',
  props: {
    totalAmount: {
      type: Number,
      required: true
    }
  },
  methods: {
    checkout() {
      this.$emit('checkout')
      // Implement checkout logic here
      /*this.$router.push('/checkout')
        //console.log('Checkout clicked');
        this.$router.push({
          path: '/checkout',
          query: {HCName: this.hawkerCentre}
        })*/
    },
    cancelOrder() {
      // Implement cancel order logic here
      //console.log('Cancel Order clicked');
      this.$emit('cancelOrder')
      this.$router.push('/CustD')
    }
  }
}
</script>

<style scoped>
.checkout-area {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 5vh;
  width: 30vw;
}

.totalAmount {
  font-size: 1.5vw; 
  font-weight: bold;
  text-align: right;
  width: 90%;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
}

button {
  display: flex;
  align-items: center;
  gap: 1vw;
  margin: 0.5vh 0;
  padding: 1vh 1vw; 
  font-size: 1.25vw; 
  cursor: pointer;
  border: none;
  border-radius: 0.5vh;
  font-weight: bold;
  background-color: #00adb5;
  color: white;
  width: 80%;
  font-family: 'Inria Sans', sans-serif;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

button:hover {
  background-color: #007b83; /* Darker shade for hover effect */
}

</style>
