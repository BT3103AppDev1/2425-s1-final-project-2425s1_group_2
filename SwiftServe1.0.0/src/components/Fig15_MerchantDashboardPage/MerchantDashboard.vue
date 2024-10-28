<template>
    <div id ="page">
        <div id="merchantdashboard">
            <button class= "clickable" id="merchantFoodAvail" @click="goToMerchantToggleAvailability">
                <span class="iconspan">
                    <img src="/toggleswitch_icon.png" alt="toggle" class= "icon">
                </span>
                <span class="text">
                    Toggle Food Availability
                </span>
            </button>
            <button class = "clickable" id="merchantOrders" @click="goToMerchantOrders">
                <span class="iconspan">
                    <img src="/document_icon.png" alt="document" class= "icon">
                </span>
                <span class="text">
                    Orders
                </span>
            </button>
            <button class="clickable" id="merchantSales" @click="goToMerchantSalesDashboard">
                <span class="iconspan">
                    <img src="/salesdashboard_icon.png" alt="sales" class= "icon">
                </span>
                <span class="text">
                    Sales Dashboard
                </span>
            </button>
        </div>
    </div>

</template>

<style scoped>

</style>

<script>
import firebaseApp from '@/firebase.js';
// import { getFirestore, getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { getAuth} from "firebase/auth";
// const db = getFirestore(firebaseApp);

export default {
  name: 'OrdersPageComponent',

  data() {
    return {
      user: false,
      merchantId: '',
      orderData: [],
      orderNumMap: {}
    };
    },

  async mounted() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.merchantId = "6CrzYngTYekKWIkSmohR"; //to replace with user id
      }
    });
    },

    methods: {
        goToMerchantToggleAvailability(){
            this.$router.push('/merchantToggleAvailability');
        },
        goToMerchantOrders(){
            this.$router.push('/merchantOrders');
        },
        goToMerchantSalesDashboard(){
            // this.$router.push('/merchantToggleAvailability')
            alert("go to sales dashboard");
        }
    }
}
</script>

<style scoped>
.title-merchant {
    font-family: 'Inria Sans', sans-serif;
    font-size: 2vw;
    text-align: center;
    margin-bottom: 1vw;
}

#merchantOrders, #merchantFoodAvail, #merchantSales {
    background-color: #00adb5;
    color: white;
    height: 12vw;
    width: 20vw;
    border-radius: 2vw;
    font-size: 1.5vw;
    border: none;
    
    display: flex;
    flex-direction: column; /* Arrange icon and text vertically */
    justify-content: center; /* Centers items within button */
    align-items: center;
    position: relative; /* Allows absolute positioning of text */
}

.iconspan {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1; /* Takes up available space, centering icon in button */
}

.icon {
    width: 5vw;
    margin-bottom: 2vw;
}

#merchantFoodAvail .icon{
    width: 7vw;
}

.text {
    position: absolute;
    bottom: 0.5vw; /* Position text at the bottom */
    text-align: center;
    margin-bottom: 0.75vw;
}

#page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#merchantdashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 14vw 14vw;
  gap: 1.5vw;
  width: 50vw;
  padding: 2vw;
  border-radius: 1vw;
  justify-items: center;
}

#merchantFoodAvail {
  grid-column: 1;
}

#merchantOrders {
  grid-column: 2;
}

#merchantSales {
  grid-column: 1 / -1;
}

#merchantOrders:hover,
#merchantFoodAvail:hover,
#merchantSales:hover {
    background-image: linear-gradient(rgb(0 0 0/10%) 0 0);
}
</style>