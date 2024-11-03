<template>
  <div class="diningLocator">
    <h3>Choose Dining Location</h3>

    <div class="inputForm">
      <label for="hawkerCentre">Hawker Centre: </label>

      <select v-model="selectedHawkerCentre" id="hawkerCentre">
        <option
          v-for="centre in hawkerCentres"
          :key="centre"
          :value="centre"
          :disabled="centre.Status !== 'Open'"
        >
          {{ centre.Name }}
        </option>
      </select>
    </div>
    <button @click="goHawkerCentrePage" id="HCButton">Let's go</button>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
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
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
        this.fetchHawkerCentres()
      }
    })
  },

  methods: {
    goHawkerCentrePage() {
      if (this.selectedHawkerCentre) {
        this.$router.push({
          path: '/hawkerCentre',
          query: { HCName: this.selectedHawkerCentre.Name }
        })
      } else {
        alert('No Hawker Centre Selected.')
      }
    },

    async fetchHawkerCentres() {
      const hawkerList = await getDocs(collection(db, 'Hawker Centre'))
      this.hawkerCentres = []

      hawkerList.forEach((docs) => {
        let docsData = docs.data()
        this.hawkerCentres.push({
          Name: docsData['Name'],
          Status: docsData['Status']
        })
      })
    }
  }
}
</script>

<style scoped>
.diningLocator {
  margin-top: 20vh;
  text-align: center;
}

.inputForm {
  font-family: 'Inria Sans', sans-serif;
  color: #00adb5;
  font-size: 3vh;
}

h3 {
  font-family: 'Inria Sans', sans-serif;
  font-weight: bold;
  font-size: 5vh;
  color: #00adb5;
}

#hawkerCentre {
  font-family: 'Inria Sans', sans-serif;
  font-size: 2.5vh;
  background-color: #ffffff;
  border: 2px solid #00adb5;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 40px;
  color: #00adb5;
}

#hawkerCentre option {
  color: #00adb5;
  background-color: #ffffff;
}

#hawkerCentre option:disabled {
  color: #ffffff;
  background-color: #c6d4d4;
}

#hawkerCentre:focus {
  outline: none;
  border-color: #00adb5;
}

#hawkerCentre::-ms-expand {
  display: none;
}

#hawkerCentre::-webkit-scrollbar {
  display: none;
}

button {
  font-family: 'Inria Sans', sans-serif;
  background-color: #00adb5;
  font-weight: bold;
  font-size: 4vh;
  color: white;
  border-radius: 5px;
  border: none;
  height: 7vh;
  width: 15vw;
}
</style>
