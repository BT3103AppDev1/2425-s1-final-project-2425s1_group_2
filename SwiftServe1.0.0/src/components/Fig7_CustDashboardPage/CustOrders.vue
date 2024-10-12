<template>
    <div class="topContainer">
        <div class="Placed Orders">
          <h3 class="poTitle">Current Placed Orders</h3>
          <div class="tableContainer">
            <table id = "table">
              <tbody>
                <tr>
                    <th>Order Number</th>
                    <th>Hawker Centre</th>
                    <th>Hawker Store</th>
                    <th>Quantity</th>
                    <th>Dine in / Takeaway</th>
                    <th>Dining Time</th>
                    <th>Seats</th>
                    <th>Order Status</th>
                    <th>Collected</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <img src="/NewOrderButton.png" alt="NewOrderButton" class="NOB" @click="NOBClick"/>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../../firebase.js'
import  { getFirestore } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebaseApp)

export default {

  mounted() {
    async function getCurrentOrders() {
      const userID = "GCCtdHkClVS2iR9fb87A"; //hard coded for now
      let allOrders = await getDocs(collection(db, "UserProfile", userID, "Current Orders"));

      let index = 1;

      allOrders.forEach((docs) => {
        let docsData = docs.data()

        let orderNum = docsData["Order Number"]
        let hawkerCentre = docsData["Hawker Centre"]
        let hawkerStore = docsData["Hawker Store"]
        let Items = docsData["Item"]
        let DiningStatus = docsData["Dining Status"]
        let DiningTime = docsData["Dining Time"]
        let Seats = docsData["Seats"]
        let OrderStatus = docsData["Order Status"]
        let Collected = ""

        let table = document.getElementById("table")
        let row = table.insertRow(index)

        let cell1 = row.insertCell(0); 
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);
        let cell9 = row.insertCell(8);
  

        cell1.innerHTML = orderNum;
        cell2.innerHTML = hawkerCentre;
        cell3.innerHTML = hawkerStore;
        cell4.innerHTML = Items;
        cell5.innerHTML = DiningStatus;
        cell6.innerHTML = DiningTime;
        cell7.innerHTML = Seats;
        cell8.innerHTML = OrderStatus;
        cell9.innerHTML = Collected;
        
        index += 1
      })


    }

    getCurrentOrders();
  },

  methods: {
    NOBClick() {
      this.$router.push('/diningOptions');
    }
  }
}

</script>

<style scoped>
h3 {
    font-weight: bold;
    margin-left: 1vw;
}

.topContainer {
  display: flex;
}

img {
    width: 14vw;
    margin-right: 5vw;
    margin-top: 10vh;
}

.tableContainer {
  border: 2px solid #00ADB5;
  width: 90%;
  height: 40vh;
  overflow: auto;
  margin-left: 1vw; 
}

#table {
  border-collapse: collapse;
  table-layout: fixed; 
  margin: 0; 
  font-size: 2vh;
  overflow: auto;
  table-layout: fixed;
}

th {
  font-weight: bold;
  background-color: rgb(230, 227, 227);
  height: 2vh;
}

tbody, th {
    border: 2px solid grey;
    text-align: center;
    padding: 7px;
}

:deep(td) {
    border: 2px solid grey;
    text-align: center;
    padding: 7px;
    height: 2vh;
}

:deep(tr:nth-child(even)) {
    background-color: rgb(214, 252, 252);
}

</style>