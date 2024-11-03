<template>
  <div class="container">
    <form id="userForm">
      <div class="formData">
        <div id="inputForm">
          <h2 class="inputTitles">Username:</h2>
          <input type="text" class="inputBoxes" id="username1" required />

          <h2 class="inputTitles">Current Password:</h2>
          <div class="password-input">
            <input
              :type="'text'"
              class="inputBoxes"
              id="password1"
              v-model="currentPassword"
              :style="{ '-webkit-text-security': showPasswords ? 'none' : 'disc' }"
              required
            />
          </div>

          <h2 class="inputTitles">Confirm New Password:</h2>
          <div class="password-input">
            <input
              :type="'text'"
              class="inputBoxes"
              id="cPassword1"
              v-model="confirmPassword"
              :style="{ '-webkit-text-security': showPasswords ? 'none' : 'disc' }"
              required
            />
            <div class="show-password-wrapper">
              <label for="showPasswords">Show Password</label>
              <input
                type="checkbox"
                id="showPasswords"
                v-model="showPasswords"
                class="custom-checkbox"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="save">
        <button id="savebutton" type="button" @click="savetoFirestore">Save Changes</button>
      </div>
    </form>

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
import firebaseApp from '@/firebase.js'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import {
  getAuth,
  updatePassword,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile
} from 'firebase/auth'

const db = getFirestore(firebaseApp)

export default {
  name: 'UpdateSettings',
  data() {
    return {
      user: false,
      showCustomModal: false,
      modalMessage: '',
      nextStep: null,
      showPasswords: false,
      currentPassword: '',
      confirmPassword: ''
    }
  },
  emits: ['updateProfile'],
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
      }
    })
  },
  methods: {
    openModal(message, nextStep = null) {
      this.modalMessage = message
      this.showCustomModal = true
      this.nextStep = nextStep
    },
    closeModal() {
      this.showCustomModal = false
      this.modalMessage = ''
      if (this.nextStep) {
        this.nextStep()
        this.nextStep = null
      }
    },
    async savetoFirestore() {
      let username = document.getElementById('username1').value
      try {
        if (username && username !== this.user.displayName) {
          await updateProfile(this.user, { displayName: username })
          const userDocRef = doc(db, 'UserProfile', this.user.uid)
          await updateDoc(userDocRef, { displayName: username })
          this.openModal('Username successfully changed!', this.validatePasswords)
          this.$emit('updateProfile')
          document.getElementById('userForm').reset()
        } else {
          this.validatePasswords()
          document.getElementById('userForm').reset()
        }
      } catch (error) {
        this.openModal(`Error: ${error.message}`)
      }
      document.getElementById('userForm').reset()
    },
    async validatePasswords() {
      let password = this.currentPassword
      let cPassword = this.confirmPassword
      if (!password || !cPassword) {
        this.openModal('Please fill in both password fields!')
      } else {
        try {
          const credential = EmailAuthProvider.credential(this.user.email, password)
          await reauthenticateWithCredential(this.user, credential)
          if (password !== cPassword) {
            await updatePassword(this.user, cPassword)
            this.openModal('Password updated successfully!')
          } else if (password === cPassword) {
            this.openModal('New password is not allowed to be the same as current password!')
          }
        } catch (error) {
          this.openModal(`Provided password is incorrect! Please try again`)
          document.getElementById('userForm').reset()
        } finally {
          // Clear the fields
          this.currentPassword = ''
          this.confirmPassword = ''
        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  font-family: 'Inria Sans', sans-serif;
}

.formData {
  display: flex;
  flex-direction: column;
  margin: 20vh 10vw;
}

.inputBoxes {
  width: 50vw;
  height: 5vh;
  border-radius: 5px;
  border: 2px solid #00adb5;
  font-size: 20px;
  margin-bottom: 5px;
}

.inputTitles {
  color: #00adb5;
  font-size: 2.5vh;
  font-weight: bold;
  margin-bottom: 5px;
}

.password-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.show-password-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  width: 100%;
}

.custom-checkbox {
  margin-left: 10px;
  width: 20px;
  height: 20px;
  appearance: none;
  border: 2px solid #00adb5;
  border-radius: 3px;
  cursor: pointer;
  background-color: white;
}

.custom-checkbox:checked {
  background-color: #00adb5;
}

.custom-checkbox:checked::after {
  content: '';
}

.show-password-wrapper label {
  color: #00adb5;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.save {
  display: flex;
  justify-content: center;
  margin-top: -150px;
}

button {
  background-color: #00adb5;
  font-weight: bold;
  font-size: 3vh;
  color: white;
  border-radius: 5px;
  border: none;
  height: 7vh;
  width: 25vw;
  cursor: pointer;
  font-family: 'Inria Sans', sans-serif;
}

button:hover {
  background-color: #007a80;
}

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
