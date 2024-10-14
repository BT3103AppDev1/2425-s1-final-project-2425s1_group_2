<!-- not done yet -->
<!-- validation function -->
<!-- alignment and static -->
<!-- underline -->
<!-- routing -->
 <!-- eye problems -->

<template>
  <div class="login-page">
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required />
        </div>

        <div class="form-actions">
          <a href="#" class="forgot-password" @click.prevent="handleForgotPassword">Forgot Password?</a>
          <div class="show-password">
            <input type="checkbox" id="showPassword" v-model="showPassword" />
            <label for="showPassword">Show Password</label>
          </div>
        </div>

        <button type="submit" class="login-button">Login</button>
      </form>

  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    handleLogin() {
      // check, authenticate and login
      console.log('Login attempted', { email: this.email, password: this.password })
    },
    handleForgotPassword() {
      // router
      console.log('Forgot password clicked')
    }
  }
}
</script>

<style scoped>
.login-page {
  font-family: 'Inria Sans', sans-serif;
  background-color: #FFFFFF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2vw;
  font-size: 2.5vmin;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100vw;
}


form {
  width: 100%;
  min-width: 300px;
  max-width: 500px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 1vh;
  color: #00ADB5;
  font-size: 18px;
  font-weight: bold;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 1vh;
  border: 2px solid #00ADB5;
  border-radius: 5px;
  font-size: 18px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3vh;
}

.forgot-password {
  color: #00ADB5;
  text-decoration: none;
  font-size: 18px;
}

.forgot-password:hover {
  color: #007a80;
}

.show-password {
  display: flex;
  align-items: center;

}

.show-password input {
  margin-right: 5px;
  transform: scale(1.2);
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #00adb5;
  border-radius: 3px;
  cursor: pointer;
}

.show-password input:checked {
  background: #00adb5;
  border: 2px solid #00adb5;
}

.show-password input:checked::after {
  content: '';
  display: block;
  position: absolute;
  width: 5px;
  height: 10px;
  border: #FFFFFF;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  top: 2px;
  left: 4px;
}

.show-password label {
  color: #00ADB5;
  font-size: 18px;
}

.login-button {
  width: 100%;
  background-color: #00ADB5;
  color: #FFFFFF;
  border: none;
  padding: 12px;
  border-radius: 5px;
  font-size: 21px;
  font-weight: bold;
  cursor: pointer;
  font-family: Inria Sans, sans-serif;
  box-sizing: border-box;
}

.login-button:hover {
  background-color: #007a80;
}

button:hover {
  background-color: #007a80;
}

</style>