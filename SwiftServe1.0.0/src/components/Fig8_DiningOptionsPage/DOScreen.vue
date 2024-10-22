<template>
  <div class="diningLocator">
    <h3>Choose Dining Location</h3>
    <br />

    <div class="inputForm">
      <label for="hawkerCentre">Hawker Centre: </label>

      <select v-model="selectedHawkerCentre" id="hawkerCentre">
        <option v-for="centre in hawkerCentres" :key="centre" :value="centre" :disabled="centre.Status !== 'Open'">
          {{ centre.Name }}
        </option>
      </select>
    </div>
    <br />
    <button @click="goHawkerCentrePage" id="HCButton">Let's go</button>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from '../../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, getDocs } from 'firebase/firestore'

const db = getFirestore(firebaseApp)

export default {
  data() {
    return {
      user: false,
      hawkerCentres: [],
      selectedHawkerCentre: ''
    }
  },
  mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                this.fetchHawkerCentres();
            }
        })
    },

    methods: {
      goHawkerCentrePage() {
        if (this.selectedHawkerCentre) {
          this.$router.push('/hawkerCentre')
        } else {
          alert("No Hawker Centre Selected.")
        }
      },

      async fetchHawkerCentres() {
        const hawkerList = await getDocs(collection(db, 'Hawker Centre')); 
        this.hawkerCentres = [];

        hawkerList.forEach((docs) => {
          let docsData = docs.data();
          this.hawkerCentres.push({
            Name: docsData['Name'],
            Status: docsData['Status']
          })
          
        })
      }
    },
  //go to particular hawker centre page not done yet [selectedHawkerCentre]
  //goHawkerCentrePage button method not done yet
}
</script>

<style scoped>
.diningLocator {
  margin-top: 20vh;
  text-align: center;
}

.inputForm {
  color: #00adb5;
  font-size: 2.5vh;
}

h3 {
  font-weight: bold;
  font-size: 4vh;
  color: #00adb5;
}

#hawkerCentre {
  font-size: 2.5vh;
}

button {
  background-color: #00adb5;
  font-weight: bold;
  font-size: 3vh;
  color: white;
  border-radius: 5px;
  border: none;
  height: 5vh;
  width: 15vw;
}
</style>
