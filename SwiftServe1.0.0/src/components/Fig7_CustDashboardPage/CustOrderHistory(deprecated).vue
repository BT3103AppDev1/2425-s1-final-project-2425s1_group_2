<template>
  <div class="topContainer">
    <div class="Placed Orders">
      <h3 class="PastOrdersTitle">Past 5 Orders</h3>

      <table id="historyTable">
        <tbody>
          <tr>
            <th>Order Number</th>
            <th>Hawker Centre</th>
            <th>Hawker Store</th>
            <th>Items</th>
            <th>Quantity</th>
            <th>Quick Order</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, query, orderBy, where, limit, getDocs } from 'firebase/firestore'
import { getAuth } from "firebase/auth"

const db = getFirestore(firebaseApp)

export default {
  name: 'CustOrders',

  data() {
    return {
        user:false,
    }
  },

  async mounted() {
    const auth = getAuth();
    this.user = auth.currentUser.uid;
    await this.getPastOrders(this.user)
  },

  methods: {

    async getPastOrders(userID) {
      //let allOrders = await getDocs(collection(db, 'Placed Orders', userID, 'Orders'))
      let ordersQuery = query(
        collection(db, 'Placed Orders', userID, 'Orders'), 
        where('Collected', '==', true),
        orderBy('dateCreated', 'desc'), 
        limit(5)
      );

      let allOrders = await getDocs(ordersQuery)

      let index = 1

      allOrders.forEach((docs) => {
        let docsData = docs.data()
        let orderID = docs.id;

        let orderNum = docsData['OrderNum']
        let hawkerCentre = docsData['Hawker Centre']
        let hawkerStore = docsData['Hawker Store']
        let Items = docsData['Item']
        let Quantity = docsData['Quantity']
        //let QuickOrder = ''

        let table = document.getElementById('historyTable')
        let row = table.insertRow(index)

        let cell1 = row.insertCell(0)
        let cell2 = row.insertCell(1)
        let cell3 = row.insertCell(2)
        let cell4 = row.insertCell(3)
        let cell5 = row.insertCell(4)
        let cell6 = row.insertCell(5)


        cell1.innerHTML = orderNum
        cell2.innerHTML = hawkerCentre
        cell3.innerHTML = hawkerStore
        cell4.innerHTML = Items
        cell5.innerHTML = Quantity

        let quickOrderButton = document.createElement('button');
        quickOrderButton.className = 'QuickOrder';
        quickOrderButton.innerHTML = 'Quick Order';
        quickOrderButton.onclick = () => this.quickOrder(userID, orderID);
        cell6.appendChild(quickOrderButton);

        index += 1

      })
    },

    quickOrder(userID, orderID) {
      //Add to cart feature not done yet
      console.log(userID);
      console.log(orderID)
    }

  }
}

</script>

<style scoped>
h3 {
  font-weight: bold;
  margin-left: 1vw;
}

table {
  border: 2px solid #00adb5;
  border-collapse: collapse;
  width: 70%;
  margin-left: 1vw;
  font-size: 2vh;
}

th {
  font-weight: bold;
  background-color: rgb(230, 227, 227);
}

tbody,
th {
  border: 1px solid black;
  text-align: center;
  font-size: 2vh;
  padding: 7px;
}

:deep(td) {
  border: 1px solid black;
  text-align: center;
  padding: 7px;
}

:deep(tr:nth-child(even)) {
  background-color: rgb(214, 252, 252);
}

:deep(.QuickOrder) {
  font-size: 2vh;
  background-color: rgb(255, 204, 0);
  border: none;
  border-radius: 5px;
  display: inline-block;  
  width: 10vw;
  height: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.3vw;
}

:deep(.QuickOrder):hover {
  font-size: 2vh;
  background-color: orange;
  border: 2px solid black;
  border-radius: 5px;
  display: inline-block;  
  width: 10vw;
  height: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.3vw;
}
</style>
