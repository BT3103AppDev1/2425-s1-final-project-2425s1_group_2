<template>
  <div class="reset-password-page">
    <form @submit.prevent="handleResetPassword">
      <div class="form-group">
        <h1>Reset Your Password</h1>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <button type="submit" class="reset-password-button">Send Email Link</button>
    </form>

    <div v-if="showSuccessModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="closeSuccessModal">&times;</button>
        <div class="modal-text">
          <h2>Check your inbox for your password reset email!</h2>
          <p>We've sent you a link to help you get back in</p>
        </div>
        <div class="modal-actions">
          <button @click="redirectToLogin" class="modal-button">Okay</button>
        </div>
      </div>
    </div>

    <div v-if="showErrorModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="closeErrorModal">&times;</button>
        <div class="modal-text">
          <h2>Error Sending Email</h2>
          <p>{{ errorMessage }}</p>
        </div>
        <div class="modal-actions">
          <button @click="closeErrorModal" class="modal-button">Okay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase.js'
import { sendPasswordResetEmail } from 'firebase/auth'

export default {
  name: 'ResetPassword',
  data() {
    return {
      email: '',
      showSuccessModal: false,
      showErrorModal: false,
      errorMessage: ''
    }
  },
  methods: {
    async handleResetPassword() {
      try {
        await sendPasswordResetEmail(auth, this.email)
        this.showSuccessModal = true
      } catch (error) {
        this.errorMessage = 'Error sending password reset email: ' + error.message
        this.showErrorModal = true
      }
    },
    closeSuccessModal() {
      this.showSuccessModal = false
    },
    closeErrorModal() {
      this.showErrorModal = false
    },
    redirectToLogin() {
      this.closeSuccessModal()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.reset-password-page {
  font-family: 'Inria Sans', sans-serif;
  background-color: #ffffff;
  min-height: 40vw;
  display: flex;
  flex-direction: column;
  padding: 2vw;
  font-size: 2.5vw;
  justify-content: center;
  align-items: center;
  width: 100%;
}

form {
  width: 100%;
  min-width: 20vw;
  max-width: 35vw;
}

.form-group {
  margin-bottom: 2vw;
}

label {
  display: block;
  margin-bottom: 0.5vw;
  color: #00adb5;
  font-size: 1.35vw;
  font-weight: bold;
}

input[type='email'] {
  width: 100%;
  padding: 0.5625vw;
  border: 2px solid #00adb5;
  border-radius: 5px;
  font-size: 0.9375vw;
  box-sizing: border-box;
}

.reset-password-button {
  width: 70%;
  background-color: #00adb5;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 5px;
  font-size: 2vw;
  font-weight: bold;
  cursor: pointer;
  margin-left: 5vw;
  margin-top: 2vw;
}

.reset-password-button:hover {
  background-color: #007a80;
}

h1 {
  font-size: 3vw;
  color: #00adb5;
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
  text-align: center;
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  border: 2px solid #00adb5;
  width: 400px;
  padding: 30px;
  position: relative;
  z-index: 1010;
  text-align: center;
  border-radius: 6px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #00adb5;
  color: white;
  border: none;
  border-radius: 3px;
  width: 30px;
  height: 30px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-text {
  font-family: 'Inria Sans', sans-serif;
  color: #00adb5;
  font-size: 1vw;
  line-height: 1.5;
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.modal-button {
  background-color: #00adb5;
  font-family: 'Inria Sans', sans-serif;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
  font-size: 1vw;
  margin: 0 5px;
}

.modal-button:hover {
  background-color: #007a80;
}
</style>
