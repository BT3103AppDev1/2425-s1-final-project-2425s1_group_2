<template>
  <div class="receipt-container">
    <div class="receipt-header">
      <h1>Receipt</h1>
      <router-link to="/">
      <img src="/RedCross.png" alt="Go Back" class="cancel" />
      </router-link>
    </div>
    <div class="order-items">
      <div v-for="(order, index) in orders" :key="index" class="order-item">
        <h2>Order {{ index + 1 }}</h2>
        <p>{{ order.hawker }}</p>
        <p>{{ order.stall }}</p>
        <p>{{ order.quantity }}x {{ order.dish }}</p>
        <p>${{ order.price.toFixed(2) }}</p>
        <button class="edit-button">Edit</button>
      </div>
    </div>
    <div class="total">
      <h2>Total: ${{ total.toFixed(2) }}</h2>
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
        <img src="/visamaster.png" alt="Visa/Mastercard" />
        <img src="/paynow.png" alt="PayNow" />
        <img src="/paylah.png" alt="PayLah!" />
      </div>
    </div>
    <button class="confirm-button">Confirm and Pay</button>
  </div>
</template>

<script>
export default {
  name: 'ReceiptComponent',
  data() {
    return {
      orders: [
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
        }
      ],
      dineOption: 'Dine in',
      diningTime: '12:00pm - 12:30pm'
    }
  },
  computed: {
    total() {
      return this.orders.reduce((sum, order) => sum + order.price * order.quantity, 0)
    }
  }
}
</script>

<style scoped>
.receipt-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: #EEFFFF;
  font-family: 'Inria Sans', sans-serif;
}

.receipt-header {
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 2px solid black;
  padding-bottom: 10px;
}

.cancel {
  width: 50px;
  position: absolute;
  right:70px;
  top: 200px;
  cursor: pointer;
}

.order-items {
  flex-grow: 1;
}

.order-item {
  background-color: #EEFFFF;
  padding: 10px;
  border-radius: 5px;
  position: relative;
}

.order-item p {
  margin: 5px 0;
  line-height: 1.2;
}

.edit-button {
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: #00adb5;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 3px;
  font-size: 18px;
}

.total {
  text-align: right;
  border-bottom: 2px solid black;
  padding-bottom: 10px;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 35px; /* Add margin to create space between total and dropdowns */
}

.options {
  margin-bottom: 20px;
}

.option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.option label {
  flex: 0 0 150px;
  margin-right: 10px;
  font-size: 17px;
  font-weight: bold;
  text-align: right;
}

select {
  width: 160px;
  padding: 5px;
  font-size: 1.0em;
  font-family: 'Inria Sans', sans-serif;
  border: none;
  border-radius: 10px;
  background-color: #00adb5;
  color: #ffffff;
}

.payment-mode {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.payment-mode h3 {
  flex: 0 0 150px;
  margin-right: 10px;
  font-weight: bold;
  text-align: right;
}

.payment-options {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.payment-options img {
  height: 30px;
  width: auto;
  margin-right: 10px;
}

.confirm-button {
  background-color: #00adb5;
  color: white;
  border: none;
  padding: 15px;
  font-size: 18px;
  border-radius: 2px;
  width: 100%;
}
</style>