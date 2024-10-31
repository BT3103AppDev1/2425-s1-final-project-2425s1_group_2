<template>
  <div class="reset-password-page">
    <form @submit.prevent="handleResetPassword">
      <div class="form-group">
        <h1>Reset Password </h1>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <button type="submit" class="reset-password-button">Send Email Link</button>
    </form>
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
      newPassword: '',
      showPassword: false
    }
  },
  methods: {
    async handleResetPassword() {
      try {
        await sendPasswordResetEmail(auth, this.email)
        alert('Password reset email sent! Check your inbox.')
        this.$router.push('/login')
      } catch (error) {
        alert('Error sending password reset email: ' + error.message)
      }
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
</style>
