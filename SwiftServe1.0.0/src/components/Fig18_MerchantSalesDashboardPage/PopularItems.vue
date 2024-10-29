<template>
  <div class="popular-items">
    <h2>Most Popular Food Items</h2>
    <ul v-if="topItems.length">
      <li v-for="(item, index) in topItems" :key="item.foodItemName">
        {{ index + 1 }}. {{ item.foodItemName }} - {{ item.totalQuantity }} {{ item.totalQuantity === 1 ? 'order' : 'orders' }}
      </li>
    </ul>
    <p v-else>No data available</p>
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "PopularItems",
  props: {
    selectedPeriod: {
      type: String,
      default: 'day'
    }
  },
  data() {
    return {
      orders: [],
      topItems: [],
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.fetchOrders();
      }
    });
  },
  watch: {
    selectedPeriod: "fetchOrders",
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
        this.calculateTopItems();
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    },
    calculateTopItems() {
      const today = new Date();
      let startDate;

      // Set the start date based on the selected period
      if (this.selectedPeriod === 'day') {
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      } else if (this.selectedPeriod === 'week') {
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay());
      } else if (this.selectedPeriod === 'month') {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      }

      // Filter orders based on the start date
      const filteredOrders = this.orders.filter(order => order.dateCreated >= startDate);

      // Count quantities of each item
      const itemCounts = {};
      filteredOrders.forEach(order => {
        const itemName = order.foodItemName;
        const quantity = order.quantity;
        if (itemCounts[itemName]) {
          itemCounts[itemName] += quantity;
        } else {
          itemCounts[itemName] = quantity;
        }
      });

      // Convert to array and sort by quantity, descending
      const sortedItems = Object.keys(itemCounts)
        .map(name => ({ foodItemName: name, totalQuantity: itemCounts[name] }))
        .sort((a, b) => b.totalQuantity - a.totalQuantity);

      // Get the top 3 items
      this.topItems = sortedItems.slice(0, 3);
    }
  }
};
</script>

<style scoped>
.popular-items {
  background-color: #00adb5;
  padding: 20px;
  color: white;
  font-size: 1.2rem;
  margin-top: 20px;
}

.popular-items h2 {
  margin-bottom: 10px;
}

.popular-items ul {
  list-style: none;
  padding: 0;
}

.popular-items li {
  font-size: 1.1rem;
  margin-bottom: 5px;
}
</style>
