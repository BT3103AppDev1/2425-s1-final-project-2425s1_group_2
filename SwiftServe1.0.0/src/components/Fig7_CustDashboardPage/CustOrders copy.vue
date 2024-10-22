<template>
    <div class="topContainer">
      <div class="Placed Orders">
        <h3 class="poTitle">Current Placed Orders</h3>
        <div class="tableContainer">
          <table id="table">
            <tbody>
              <tr id="data">
                <th>Order Number</th>
                <th>Hawker Centre</th>
                <th>Hawker Store</th>
                <th>Items</th>
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
        <img src="/NewOrderButton.png" alt="NewOrderButton" class="NOB" @click="NOBClick" />
      </div>
    </div>
  </template>
  
  <script>
  import firebaseApp from '../../firebase.js'
  import { getFirestore } from 'firebase/firestore'
  import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
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
      await this.getCurrentOrders(this.user)
    },
  
    methods: {
      NOBClick() {
        this.$router.push('/diningOptions')
      },
      async getCurrentOrders(userID) {
        let allOrders = await getDocs(collection(db, 'Placed Orders', userID, 'Orders'))
  
        let index = 1
  
        allOrders.forEach((docs) => {
          let docsData = docs.data()
          let orderID = docs.id;
          if (docsData['Collected'] == false) {
  
            let orderNum = docsData['OrderNum']
            let hawkerCentre = docsData['Hawker Centre']
            let hawkerStore = docsData['Hawker Store']
            let Items = docsData['Item']
            let Quantity = docsData['Quantity']
            let DiningStatus = docsData['Dining Status']
            let DiningTime = docsData['Dining Time']
            let Seats = docsData['Seats']
            let OrderStatus = docsData['Order Status']
            //let Collected = docsData['Collected']
  
            let table = document.getElementById('table')
            let row = table.insertRow(index)
  
            let cell1 = row.insertCell(0)
            let cell2 = row.insertCell(1)
            let cell3 = row.insertCell(2)
            let cell4 = row.insertCell(3)
            let cell5 = row.insertCell(4)
            let cell6 = row.insertCell(5)
            let cell7 = row.insertCell(6)
            let cell8 = row.insertCell(7)
            let cell9 = row.insertCell(8)
            let cell10 = row.insertCell(9)
  
            cell1.innerHTML = orderNum
            cell2.innerHTML = hawkerCentre
            cell3.innerHTML = hawkerStore
            cell4.innerHTML = Items
            cell5.innerHTML = Quantity
            cell6.innerHTML = DiningStatus
            cell7.innerHTML = DiningTime
            cell8.innerHTML = Seats
            cell9.innerHTML = OrderStatus
            //cell10.innerHTML = Collected
  
            if (OrderStatus === 'Preparing') {
              cell9.classList.add('statusPreparing');
              cell9.innerHTML = `<span class="statusBox">${OrderStatus}</span> `;
              cell10.innerHTML = '';
            } else {
              cell9.classList.add('statusReady');
              cell9.innerHTML = `<span class="statusBox">${OrderStatus}</span> `;
  
              let collectButton = document.createElement('button');
              collectButton.className = 'OrderCollected';
              collectButton.innerHTML = 'Collected?';
              collectButton.onclick = () => this.setCollectTrue(userID, orderID);
              cell10.appendChild(collectButton);
  
    
            }
  
            index += 1
          }
        })
      },
      async setCollectTrue(userID, orderID) {
          const orderRef = doc(db, 'Placed Orders', userID, 'Orders', orderID);
  
          await updateDoc(orderRef, {
              Collected: true
          });
        
        let tb = document.getElementById("table")
          while (tb.rows.length > 1){
            tb.deleteRow(1)
          }
        this.getCurrentOrders(this.user)
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
  
  img:hover {
    border: 2px solid black;
    border-radius: 10px;
    opacity: 0.6;
  }
  
  .tableContainer {
    border: 2px solid #00adb5;
    width: 90%;
    height: 40vh;
    overflow: auto;
    margin-left: 1vw;
  }
  
  #table {
    border-collapse: collapse;
    table-layout: fixed;
    margin: 0;
    overflow: auto;
    table-layout: fixed;
  }
  
  th {
    font-weight: bold;
    background-color: rgb(230, 227, 227);
    height: 2vh;
  }
  
  tbody,
  th {
    border: 2px solid grey;
    text-align: center;
    padding: 7px;
    font-size: 2vh;
  }
  
  :deep(td) {
    border: 2px solid grey;
    text-align: center;
    font-size: 2vh;
    padding: 7px;
    height: 2vh;
  }
  
  :deep(tr:nth-child(even)) {
    background-color: rgb(214, 252, 252);
  }
  
  :deep(.statusPreparing) .statusBox {
    background-color: rgb(173, 171, 171);
    border-radius: 5px;
    display: inline-block;  
    width: 6vw;
    height: 3vh;
    display: flex;
    justify-content: center;
    align-items: center;  
    margin-left: 0.3vw;
  
  }
  
  :deep(.statusReady) .statusBox {
    background-color: rgb(5, 248, 5);
    border-radius: 5px;
    display: inline-block;  
    width: 6vw;
    height: 3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.3vw;
  }
  
  :deep(.OrderCollected) {
    font-size: 2vh;
    background-color: rgb(255, 204, 0);
    border: none;
    border-radius: 5px;
    display: inline-block;  
    width: 6vw;
    height: 3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.3vw;
  }
  
  :deep(.OrderCollected):hover {
    font-size: 2vh;
    background-color: orange;
    border: 2px solid black;
    border-radius: 5px;
    display: inline-block;  
    width: 6vw;
    height: 3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.3vw;
  }
  </style>