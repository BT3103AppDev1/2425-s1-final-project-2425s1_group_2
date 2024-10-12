<template>
      <div class="Placed Orders">
        <h3 class="poTitle">Current Placed Orders</h3>

        <!--<div>
            <ul>
                <li v-for="(item, index) in items" :key="index">{{ item.name }}</li>
            </ul>
        </div>-->

      </div>

      <div>
        <img src="/NewOrderButton.png" alt="NewOrderButton" class="NOB" @click="NOBClick"/>
      </div>
</template>

<script>
/*import firebaseApp from '../firebase.js'
import  { getFirestore } from 'firebase/firestore'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebaseApp)

export default {
    mounted() {
        async function display() {
            let allData = await getDocs(collection(db, "UserProfile"))
        }

        display()
    }
}*/

export default {
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

img {
    width: 18vw;
    margin-left: 75vw;
    margin-top: 5vh;
}

</style>