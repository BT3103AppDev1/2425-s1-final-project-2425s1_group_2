<template>
  <div class="topContainer">
    <div class="Placed Orders">
      <h3 class="PastOrdersTitle">Past 5 Orders</h3>

      <table id="table">
        <tbody>
          <tr>
            <th>Order Number</th>
            <th>Hawker Centre</th>
            <th>Hawker Store</th>
            <th>Quantity</th>
            <th>Quick Order</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

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
</style>
