<!-- to do: clean up, type check -->
 <!-- terms of service and its checkbox -->
<!-- styling spacing and how well it deals with scaling -->
 <!-- some error with the eye coz it does not show -->

import {createUser} from './createUser.js'

<template>
  <div class="container">
    <form id="userForm">
      <div class="formData">
        <div id="inputForm">
          <h2 class="inputTitles">Email:</h2>
          <input type="email" class="inputBoxes" id="email1" v-model="email" required /> <br />
          <h2 class="inputTitles">Username:</h2>
          <input type="text" class="inputBoxes" id="username1" v-model="username" required /> <br />
          <h2 class="inputTitles">Password:</h2>
        <div class="password-input">
          <input :type="showPassword ? 'text' : 'password'" class="inputBoxes" id="password1" v-model="password" required />
          <!-- <button type="button" @click="togglePassword" class="toggle-password">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button> -->
        </div> <br />
          <h2 class="inputTitles">Confirm password:</h2>
          <input :type="showPassword ? 'text' : 'password'" class="inputBoxes" id="cPassword1" v-model="cPassword" required />
        </div>
      </div>
      <div class="form-group checkbox">
          <input type="checkbox" id="agreeTerms" v-model="agreeToTerms" required />
          <label for="agreeTerms">
            By signing up you agree to our <a href="#" class="terms-link">Terms of Service</a>
          </label>
          </div>
      <div class="save">
        <button id="savebutton" type="button" v-on:click="savetoFirestore">Sign Up</button>
        <br /><br />
      </div>
    </form>
    <p class="merchant-info">
        Merchant? We'd love to hear from you! Reach out to us at
        <a href="mailto:swiftserve@gov.sg" class="email-link">swiftserve@gov.sg</a>
      </p>
  </div>
</template>

<script>
import { createUser } from './createUser.js'
import { validateNewUser } from './validateNewUser';

export default {
    data() {
      return {
        email: '',
        username: '',
        password: '',
        cPassword: '',
        showPassword: false,
        agreeToTerms: false,
      };
    },
  methods: {

    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    async savetoFirestore() {
      const { email, username, password, cPassword, agreeToTerms } = this;

      try {
        const check = validateNewUser(email, username, password, cPassword, agreeToTerms);
        if (check['value'] === false) {
          alert(check['message']);
        } else {
          await createUser(email, username, password, cPassword);
          this.resetForm();
          alert('Account Created Successfully!');
        }
      } catch (error) {
        alert('Error creating account: ' + error.message);
      }
    },
    resetForm() {
      this.email = '';
      this.username = '';
      this.password = '';
      this.cPassword = '';
      this.agreeToTerms = false;
    }
  }
}
</script>



<style scoped>
.container {
  background-color: white;
  font-family: 'Inria Sans', sans-serif;
  
}

.formData {
  margin: 20px 0;
}

.inputBoxes {
  width: calc(100% - 20px);
  border-radius: 5px;
  border: 2px solid #00adb5;
  padding: 10px;
}

.inputTitles {
  color: #00adb5;
  font-size: 1.2em;
  font-weight: bold;
  margin: 10px 0 5px;
}

.password-input {
  display: flex;
  align-items: center;
}


.toggle-password {
  margin-left: 10px;
  background: none;
  border: none;
  color: #00adb5;
  cursor: pointer;
}



.formData {
  display: flex;
  margin-left: 30vw;
  margin-top: 20vh;
}

.save {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.inputBoxes {
  width: 40vw;
  border-radius: 5px;
  border: 2px solid #00adb5;
}

.inputTitles {
  color: #00adb5;
  font-size: 2.5vh;
  font-weight: bold;
}

button {
  background-color: #00adb5;
  font-weight: bold;
  font-size: 3vh;
  color: white;
  border-radius: 5px;
  border: none;
  height: 5vh;
  width: 20vw;
}

#save-button {
  background-color: #00ADB5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

}

.toggle-password {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #00ADB5;
  cursor: pointer;
}

.checkbox {
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: center; 
}

.checkbox input {
  margin-right: 5px;
}

.terms-link {
  color: #00ADB5;
  text-decoration: none;
}

.email-link {
  color: #00ADB5;
  text-decoration: none;
  font-weight: bold;
}

.terms-link:hover {
  color: #007a80;
}

.email-link:hover {
  color: #007a80;
}

.merchant-info {
  text-align: center;
  font-size: 1.8vh;
  margin-top: 2vh;
}

#form-group {
  text-align: center;
  margin-top: 20px;
}

button:hover {
background-color: #007a80;
}

</style>
