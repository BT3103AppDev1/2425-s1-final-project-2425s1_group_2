<template>
  <div class="container">
    <form id="userForm">
      <div class="formData">
        <div id="inputForm">
          <h2 class="inputTitles">Username:</h2>
          <input type="text" class="inputBoxes" id="username1" required=""> <br>

          <h2 class="inputTitles">Password:</h2>
          <input type="text" class="inputBoxes" id="password1" required=""> <br>

          <h2 class="inputTitles">Confirm password:</h2>
          <input type="text" class="inputBoxes" id="cPassword1" required=""> <br><br>
        </div>
      </div>
      <div class="save">
        <button id="savebutton" type="button" v-on:click="savetoFirestore()">Save Changes</button> <br><br>
      </div>
    </form>
    <!-- Custom Modal for showing alerts -->
    <div v-if="showCustomModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <div class="modal-text">
          <h2>Notification</h2>
          <p>{{ modalMessage }}</p>
          <div class="modal-actions">
            <button @click="closeModal">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/firebase.js';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth, updatePassword, onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential, updateProfile } from 'firebase/auth';
const db = getFirestore(firebaseApp);

export default {
  name: 'UpdateSettings',
  data() {
    return {
      user: false,
      showCustomModal: false,
      modalMessage: '', // To store the message for the modal
      nextstep: null,
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    })
  },
  methods: {
    // Function to open modal with a specific message
    openModal(message, nextStep = null) {
      this.modalMessage = message;
      this.showCustomModal = true;
      this.nextStep = nextStep;  // Store the next step to execute after closing the modal
    },

    // Function to close the modal and proceed to the next step if defined
    closeModal() {
      this.showCustomModal = false;
      this.modalMessage = '';

      // If there's a next step, execute it
      if (this.nextStep) {
        this.nextStep();
        this.nextStep = null;  // Clear the next step
      }
    },
    async savetoFirestore() {
      let username = document.getElementById("username1").value;
      try {
        if (username && username !== this.user.displayName) {
          await updateProfile(this.user, { displayName: username });
          // Update displayName in Firestore
          const userDocRef = doc(db, "UserProfile", this.user.uid); // Adjust path to your Firestore collection
          await updateDoc(userDocRef, { displayName: username });
          // Show the username change modal and define the next step to handle password validation
          this.openModal("Username successfully changed!", this.validatePasswords);
        } else {
          // If no username change, directly proceed to password validation
          this.validatePasswords();
        }
      } catch (error) {
      console.error("Error updating username: ", error);
      this.openModal(`Error: ${error.message}`);
    }
  },
      async validatePasswords() {
        let password = document.getElementById("password1").value;
        let cPassword = document.getElementById("cPassword1").value;

        if (!password || !cPassword) {
      this.openModal("Please fill in both password fields!");
    } else if (password === cPassword) {
      try {
        // Reauthenticate the user using their email and current password
        const credential = EmailAuthProvider.credential(this.user.email, password);
        await reauthenticateWithCredential(this.user, credential);
        await updatePassword(this.user, password);
        this.openModal('Password updated successfully!');
        document.getElementById('userForm').reset();
      } catch (error) {
        console.error("Error updating password: ", error);
        this.openModal(`Error: ${error.message}`);
      }
    } else {
      this.openModal("Passwords do not match!");
      document.getElementById('userForm').reset();
    }
  }
}
}
</script>

<style scoped>
.formData {
  display: flex;
  margin-left: 10vw;
  margin-top: 20vh;
}

.save {
  margin-left: 20vw;
  border: none;
  padding: 16px 28px;
  border-radius: 3px;
}

/* Make the input boxes a bit longer and taller */
.inputBoxes {
  width: 50vw;
  /* Increase the width */
  height: 5vh;
  /* Increase the height */
  border-radius: 5px;
  border: 2px solid #00ADB5;
  font-size: 20px;
}

.inputTitles {
  color: #00ADB5;
  font-size: 2.5vh;
  font-weight: bold;
}

/* Make the button bigger in height */
button {
  background-color: #00ADB5;
  font-weight: bold;
  font-size: 3vh;
  color: white;
  border-radius: 5px;
  border: none;
  height: 7vh;
  /* Increase the height of the button */
  width: 25vw;
  /* Increase the width of the button */
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
  font-size: 35px;
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
  justify-content: center;
  margin-top: 20px;
}

.modal-actions button {
  background-color: #00adb5;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 60%;
  text-align: center;
  font-size: 15px;
}

.modal-actions button:hover {
  background-color: #007a80;
}
</style>