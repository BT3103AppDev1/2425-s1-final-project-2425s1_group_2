<template>
  <div class="receipt-container">
    <div class="receipt-header">
      <h1>Receipt</h1>
    </div>
    <div class="order-items">
      <div v-for="(order, index) in orders" :key="index" class="order-item">
        <h2>Order {{ index + 1 }}</h2>
        <p>{{ order.restaurant }}</p>
        <p>{{ order.dish }}</p>
        <p>{{ order.quantity }} {{ order.set }}</p>
        <p>${{ order.price.toFixed(2) }}</p>
        <button class="edit-button">Edit</button>
      </div>
    </div>
    <div class="total">
      <h2>Total: ${{ total.toFixed(2) }}</h2>
    </div>
    <div class="options">
      <div class="option">
          <label for="time-option">Dining Time: </label>
          <select id="time-option">
          <option>12:00pm - 12:30pm</option>
          <option>12:30pm - 1:00pm</option>
          <option>1:00pm - 1:30pm</option>
          <option>1:30pm - 2:00pm</option>
      </select>
      </div>
      <div class="option">
        <label>Dining Time:</label>
        <select v-model="diningTime">
          <option value="12:00pm - 12:30pm">12:00pm - 12:30pm</option>
          <!-- Add more time options as needed -->
        </select>
      </div>
    </div>
    <div class="payment-mode">
      <h3>Payment Mode:</h3>
      <div class="payment-options">
        <img src="@/assets/visamaster.png" alt="Visa/Mastercard" />
        <img src="@/assets/Paynow.png" alt="PayNow" />
        <img src="@/assets/paylah.png" alt="PayLah!" />
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
          restaurant: 'Bukit Canberra Hawker Centre',
          dish: 'Chin Lee Chicken Rice',
          quantity: '1x',
          set: 'Chicken Rice Set',
          price: 6.99
        },
        {
          restaurant: 'Bukit Canberra Hawker Centre',
          dish: 'Wang Dao Kolo Mee',
          quantity: '1x',
          set: 'Kolo Mee Set',
          price: 3.61
        }
      ],
      dineOption: 'dineIn',
      diningTime: '12:00pm - 12:30pm',
      display: true
    }
  },
  computed: {
    total() {
      return this.orders.reduce((sum, order) => sum + order.price, 0)
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
}

.receipt-header {
  text-align: center;
  margin-bottom: 20px;
}

.order-items {
  flex-grow: 1;
}

.order-item {
  background-color: #EEFFFF;
  margin-bottom: 10px;
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
  padding: 5px 10px;
  border-radius: 3px;
}

.total {
  text-align: right;
  margin: 20px 0;
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
}

select {
  flex-grow: 1; /* Dropdown will grow to take up available space */
  padding: 5px;
  font-size: 1.0em;
  font-family: 'Inria Sans', sans-serif; /* Applying Inria Sans */
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
  border-radius: 5px;
  width: 100%;
}


</style>