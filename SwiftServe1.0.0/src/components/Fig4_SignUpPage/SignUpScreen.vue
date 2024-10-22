<!-- to do: clean up, type check -->
<!-- terms of service and its checkbox -->
<!-- styling spacing and how well it deals with scaling -->
<!-- some error with the eye coz it does not show -->

<template>
  <div class="container">
    <form id="userForm">
      <div class="formData">
        <div id="inputForm">
          <h2 class="inputTitles">Email:</h2>
          <input type="email" class="inputBoxes" id="email" v-model="email" required /> <br />
          <h2 class="inputTitles">Username:</h2>
          <input type="text" class="inputBoxes" id="username" v-model="username" required /> <br />
          <h2 class="inputTitles">Password:</h2>
          <div class="password-input">
            <input
              :type="'text'"
              class="inputBoxes"
              id="password1"
              v-model="password"
              :style="{ '-webkit-text-security': showPassword ? 'none' : 'disc' }"
              required
            />
            <!-- <button type="button" @click="togglePassword" class="toggle-password">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button> -->
          </div>
          <h2 class="inputTitles">Confirm password:</h2>
            <input
              :type="'text'"
              class="inputBoxes"
              id="cPassword1"
              v-model="cPassword"
              :style="{ '-webkit-text-security': showPassword ? 'none' : 'disc' }"
              required
            />
        </div>
        <div class="show-password-wrapper">
      <div class="show-password">
        <input type="checkbox" id="showPassword" v-model="showPassword" />
        <label for="showPassword">Show Password</label>
      </div>
    </div>
      </div>
    </form>
    <div class="form-group checkbox">
      <input type="checkbox" id="agreeTerms" v-model="agreeToTerms" required />
      <label for="agreeTerms">
        By signing up you agree to our <a href="#" class="terms-link" @click.prevent="openTermsModal">Terms of Service</a>
      </label>
    </div>

    <div class="save">
      <button id="savebutton" type="button" v-on:click="savetoFirestore">Sign Up</button>
      <br /><br />
    </div>

    <p class="merchant-info">
      Merchant? We'd love to hear from you! Reach out to us at
      <a href="mailto:nusdeck@gmail.com" class="email-link">nusdeck@gmail.com</a>
    </p>


    <div v-if="showTermsModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="closeTermsModal">&times;</button>
        <div class="terms-text">
          <h2>
            Terms and Conditions for SwiftServe
          </h2>
          <p>
            Welcome to SwiftServe! By using our digital platform to order food, you agree to these Terms and Conditions. If you do not agree with these terms, please do not use our services.
          </p>
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing or using the SwiftServe platform, you accept and agree to be bound by these Terms and Conditions. If you are using the service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.</p>

          <h3>2. User Accounts</h3>
          <p>SwiftServe allows users to place orders without requiring an account. Users can choose to create an account for convenience but are not obligated to do so.</p>

          <h3>3. Age Restrictions</h3>
          <p>There are no age restrictions for using the SwiftServe platform.</p>

          <h3>4. Order Management</h3>
          <p>
            <strong>Cancellation and Refund Policy:</strong> All orders placed through the SwiftServe platform are final. No cancellations or refunds will be processed once an order is confirmed.
            <br>
            <strong>Third-Party Delivery Failures:</strong> SwiftServe shall not be liable for any failures or delays caused by third-party delivery services. Users accept that any issues arising from delivery failures are their own responsibility.
          </p>

          <h3>5. Food Quality and Liability</h3>
          <p>SwiftServe does not assume any liability for the quality of food provided by the partnered hawker centres. All food quality concerns must be directed to the respective hawker centre.</p>

          <h3>6. Payment Options</h3>
          <p>SwiftServe does not offer cash-on-delivery options. All orders must be paid for through the platform’s online payment system. There are no subscription or delivery fees associated with using the SwiftServe platform.</p>

          <h3>7. Promotions and Discounts</h3>
          <p>SwiftServe may offer promotions, vouchers, or loyalty points. These offers are non-refundable and final. The total cost of the order after applying any promotions must exceed SGD 0.05.</p>

          <h3>8. Data Protection and Privacy</h3>
          <p>SwiftServe is committed to protecting your personal data in accordance with the Personal Data Protection Act (PDPA) of Singapore. We may share your data with partners for marketing purposes. By using our services, you consent to this data sharing.</p>

          <h3>9. Dispute Resolution</h3>
          <p>Any disputes arising out of or relating to these Terms shall be resolved through mandatory arbitration in Singapore, in accordance with the rules of the Singapore International Arbitration Centre (SIAC).</p>

          <h3>10. Governing Law</h3>
          <p>These Terms shall be governed by and construed in accordance with the laws of Singapore.</p>

          <h3>11. Delivery Times and Responsibilities</h3>
          <p>SwiftServe does not guarantee specific delivery times. The partnered hawker centres are responsible for their own delivery schedules.</p>

          <h3>12. Modification of Services</h3>
          <p>SwiftServe reserves the right to modify, suspend, or discontinue any service or feature of the platform at any time without prior notice.</p>

          <h3>13. Partnerships</h3>
          <p>The SwiftServe platform exclusively serves partnered hawker centres in Singapore. User-generated menus or home kitchens are not permitted.</p>

          <h3>14. Contact Information</h3>
          <p>For any questions or concerns regarding these Terms and Conditions, please contact us at:</p>
          <p>Email: nusdeck@gmail.com <br> Phone: +65 6235 3535</p>

          <p>By using SwiftServe, you acknowledge that you have <u>read, understood, and agree</u> to these Terms and Conditions.</p>

          </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { createUser } from './createUser.js'
import { validateNewUser } from './validateNewUser'
import { auth, db } from '@/firebase.js'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      cPassword: '',
      showPassword: false,
      agreeToTerms: false,
      showTermsModal: false,
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    openTermsModal() {
      this.showTermsModal = true
    },
    closeTermsModal() {
      this.showTermsModal = false
    },

    async savetoFirestore() {
      const { email, username, password, cPassword, agreeToTerms } = this
      //console.log(email, username, password, cPassword, agreeToTerms)
      const check = validateNewUser(email, username, password, cPassword, agreeToTerms)
      if (check['valid'] === false) {
        alert(check['message'])
        return
      }

      try {
        // Create user with Firebase Authentication
        this.loading = true
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Update user profile with username
        await updateProfile(user, { displayName: username })

        // Save user information in Firestore
        const userData = {
          displayName: username,
          email: user.email,
          uid: user.uid,
          dateCreated: serverTimestamp(),
          profileType: 'Customer'
        }
        await setDoc(doc(db, 'UserProfile', user.uid), userData)

        // Reset form and show success message
        this.resetForm()
        alert('Account Created Successfully!')
        this.$router.push('/custD') //change this to login after, this is made for fast game testing
        return false
      } catch (error) {
        alert('Error creating account: ' + error.message)
      } finally {
        this.loading = false
      }
    },
    resetForm() {
      this.email = ''
      this.username = ''
      this.password = ''
      this.cPassword = ''
      this.agreeToTerms = false
      this.showPassword = false
    }
  }
}
</script>

<style scoped>
.container {
  background-color: white;
  font-family: 'Inria Sans', sans-serif;
  position: relative;
  width: 100%;
  height: 100vh;
}

.formData {
  position: relative;
  width: 100%;
}

.inputBoxes {
  width: calc(100% - 20px);
  border-radius: 5px;
  border: 2px solid #00adb5;
  padding: 10px;
  font-size: 2.5vmin;
}

.inputTitles {
  color: #00adb5;
  font-size: 2.5vmin;
  font-weight: bold;
  margin: 10px 0 5px;
}

.password-input {
  display: flex;
  align-items: center;
}

.toggle-password {
  margin-left: 15px;
  background: none;
  border: none;
  color: #00adb5;
  cursor: pointer;
}

.formData {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40vw;
  margin-left: 30vw;
  margin-top: 10vh;
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
  font-size: 18px;
  font-weight: bold;
}

button {
  background-color: #00adb5;
  font-weight: bold;
  font-size: 3vh;
  color: white;
  border-radius: 5px;
  border: none;
  height: 7vh;
  width: 20vw;
}

#save-button {
  background-color: #00adb5;
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
  color: #00adb5;
  cursor: pointer;
}

.checkbox {
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: center;
  font-size: 18px;
  margin-top: 50px;
}

.checkbox input {
  margin-right: 5px;
}

.terms-link {
  color: #00adb5;
  text-decoration: none;
}

.email-link {
  color: #00adb5;
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
  font-size: 1em;
  margin-top: 15px;
}

#form-group {
  text-align: center;
  margin-top: 20px;
}

button:hover {
  background-color: #007a80;
}

#agreeTerms {
  transform: scale(1.5);
  margin: 0 10px;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1.5px solid #00adb5;
  border-radius: 3px;
  cursor: pointer;
}

#agreeTerms:checked {
  background: #00adb5;
  border: 2px solid #00adb5;
}

#agreeTerms:checked::after {
  content: '';
  display: block;
  position: relative;
  top: 0px;
  left: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.password-input {
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
}

.form-actions {
  display: flex;
  justify-content: flex-end; /* Align the content to the right */
  align-items: center;
  width: 40vw; /* Ensure width matches the input fields */
  margin-top: 5px; /* Provide space below the confirm password field */
  position: relative; /* Set position to relative for precise alignment */
}

/* Show password wrapper to align below and adjust properly */
.show-password-wrapper {
  position: absolute;
  top: calc(100% + 15px); /* Places the show password checkbox 10px below the confirm password input */
  right: -25px; /* Align to the right edge of the input fields */
  display: flex;
  align-items: center;
}


.show-password{
  color: #00adb5;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
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

.show-password label {
  color: #00adb5;
  font-size: 18px;
  font-weight: bold; /* Ensure the label is bold */
  white-space: nowrap; /* Prevent text wrapping */
}

.show-password input:checked {
  background: #00adb5;
  border: 2px solid #00adb5;
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
  width: 80vw;
  max-width: 600px;
  max-height: 80vh;
  padding: 30px;
  overflow-y: auto;
  position: relative;
  z-index: 1010;
}

.modal-content::-webkit-scrollbar {
  width: 14px;
  height: 8px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #00adb5;
  border-radius: 10px;
  border: 2px solid #ffffff;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #007a80;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #00adb5;
  color: white;
  border: none;
  border-radius: 3px;
  width: 40px;
  height: 40px;
  font-size: 30px;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #007a80;
}

.terms-text {
  color: #00adb5;
  font-size: 16px;
  line-height: 1.5;
}

</style>
