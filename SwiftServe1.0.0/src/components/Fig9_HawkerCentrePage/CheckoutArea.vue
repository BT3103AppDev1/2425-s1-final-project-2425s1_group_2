<template>
    <div class="checkout-area">
      <p class="totalAmount">Total Amount: ${{ totalAmount }}</p>
      <button @click="checkout"><span class="cart-icon">🛒</span>Checkout</button>
      <button @click="cancelOrder"><span class="cancel-icon">❌</span>Cancel Order</button>
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
        this.$emit('cancelOrder');
        this.$router.push('/CustD')
      }
    }
  };
  </script>
  
  <style scoped>
  .checkout-area {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 20px;
  }
  
  .totalAmount {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: right; /* Ensure text is right-aligned */
    width: 100%; /* Ensure it takes the full width of the container */
  }
  
  button {
    margin: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #00ADB5;
    color: white;
    width: 100%;
    max-width: 180px; 
  }
  
  button span {
    margin-right: 10px;
  }
  </style>