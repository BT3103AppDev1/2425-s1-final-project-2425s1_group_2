<template>
  <div class="sales-overview">
    <div class="sales-text">Total Sales Amount</div>
    <div class="sales-amount">${{ totalSalesAmount }}</div>
    <div class="orders-text">Orders Completed</div>
    <div class="orders-count">{{ ordersCompleted }}</div>
  </div>
</template>

<script>

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export default {
  name: "SalesOverview",
  props: {
    selectedPeriod: {
      type: String,
      default: 'day'
    }
  },
  data() {
    return {
      orders: [],
      totalSalesAmount: 0,
      ordersCompleted: 0,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.fetchOrders();
      }
    })
  },
  methods: {
    async fetchOrders() {
      const db = getFirestore();
      const ordersQuery = query(
        collection(db, "PlacedCustOrders"),
        where("merchantId", "==", this.user.uid)
      );
      try {
        const querySnapshot = await getDocs(ordersQuery);
        this.orders = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          dateCreated: new Date(doc.data().dateCreated),
        }));
        this.calculateSales();
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    },
    calculateSales() {
      // Get today's date for filtering
      const today = new Date();
      let startDate;

      // Set startDate based on selectedPeriod
      if (this.selectedPeriod === 'day') {
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      } else if (this.selectedPeriod === 'week') {
        // Calculate Monday of the current week
        const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const daysFromMonday = (dayOfWeek + 6) % 7; // Adjust so Monday is the start of the week
        startDate = new Date(today);
        startDate.setDate(today.getDate() - daysFromMonday);
      } else if (this.selectedPeriod === 'month') {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the month
      }

      const filteredOrders = this.orders.filter(order => order.dateCreated >= startDate);

      this.totalSalesAmount = filteredOrders.reduce((sum, order) => {
        return sum + (order.foodItemPrice * order.quantity);
      }, 0);

      this.ordersCompleted = filteredOrders.length;
    },
  }
};
</script>

<style scoped>
.sales-overview {
  background-color: #00adb5;
  padding: 20px;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
}
</style>