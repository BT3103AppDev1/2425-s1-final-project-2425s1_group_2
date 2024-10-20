<template>
  <div class="Payment">
    <h1 id="DineIn">Dine In</h1>

    <img src="/checkmark.png" alt="payment success checkmark" id="checkmark" />

    <h1>Order ID: 125735</h1>
    <h1>Payment Successful</h1>
    <h3>The kitchen is currently preparing your order!</h3>
    <br /><br />
    <button id="seat" @click="SelectSeat">Select Seats</button>
  </div>
</template>

<style scoped>
.Payment {
  text-align: center;
}

#DineIn {
  -webkit-text-stroke-width: 0.01em;
  font-size: 3em;
}

#checkmark {
  width: 15vw;
}

#seat {
  height: 3vw;
  width: 15vw;
  background-color: #00adb5;
  color: white;
  border-color: transparent;
  border-radius: 0.5em;
  font-size: 1.5em;
}
</style>

<script>
export default {
  methods: {
    SelectSeat() {
      this.$router.push('/seatBooking')
    }
  }
}
</script>
