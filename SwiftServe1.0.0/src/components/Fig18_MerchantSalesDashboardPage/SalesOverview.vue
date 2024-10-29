<template>
  <div class = "sales-chart">
    <SalesChart :orders = "orders" :selectedPeriod = "selectedPeriod" />
  </div>
  <div class="sales-overview">
    <div class="sales-item">
      <div class="sales-text">Total Sales Amount</div>
      <div class="sales-amount">${{ totalSalesAmount.toFixed(2) }}</div>
    </div>
    <div class="sales-item">
      <div class="orders-text">Orders Completed</div>
      <div class="orders-count">{{ ordersCompleted }}</div>
    </div>
  </div>
</template>

<script>

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import SalesChart from "./SalesChart.vue";

export default {
  name: "SalesOverview",
  components: {
    SalesChart
  },
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
  watch: {
        selectedPeriod: "fetchOrders"
    },
  methods: {
    async fetchOrders() {
      const db = await getFirestore();
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
        console.log(this.orders)
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
        // Calculate the most recent Sunday
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay()); // Sunday as day 0
      } else if (this.selectedPeriod === 'month') {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the month
      }

      // Filter orders by startDate
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
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-family: 'Inria Sans', sans-serif;
}

.sales-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sales-text,
.orders-text {
  font-size: 1.8rem;
  padding-left: 30px;
}

.sales-amount,
.orders-count {
  font-size: 1.5rem;
  padding-right: 100px;
}
</style>