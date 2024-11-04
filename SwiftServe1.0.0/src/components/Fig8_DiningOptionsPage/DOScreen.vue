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

         <!-- Custom Modal for No Hawker Centre Selected -->
         <div v-if="showHawkerModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-text">
          <h2>Notification</h2>
          <p>No Hawker Centre Selected. Please choose one before proceeding.</p>
          <div class="modal-actions">
            <button @click="closeHawkerModal">Go back</button>
          </div>
        </div>
      </div>
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
      selectedHawkerCentre: '',
      showHawkerModal: false
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
        this.showHawkerModal = true;
      }
    },
    closeHawkerModal() {
      this.showHawkerModal = false;
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
  margin-bottom: 5vh;
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
/* Modal styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  border: 2px solid #00adb5;
  width: 400px;
  padding: 30px;
  position: relative;
  z-index: 1010;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #00adb5;
  color: white;
  border: none;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
}

.modal-text h2 {
  margin-bottom: 10px;
  color: #00adb5;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.modal-text p {
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 20px;
  color: #00adb5;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-actions button {
  background-color: #00adb5;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-size: 15px;
  margin-bottom: 10px;
}

.modal-actions button:last-child {
  margin-bottom: 0;
}

.modal-actions button:hover {
  background-color: #007a80;
}
</style>
