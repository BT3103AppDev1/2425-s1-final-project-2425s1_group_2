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
        By signing up you agree to our
        <a href="#" class="terms-link" @click.prevent="openTermsModal">Terms of Service</a>
      </label>
    </div>

    <div class="save">
      <button id="savebutton" type="button" v-on:click="savetoFirestore">Sign Up</button>
    </div>

    <div class="google-signin">
      <button id="googleSignUpButton" type="button" @click="signUpWithGoogle">
        Sign Up with Google
      </button>
    </div>

    <p class="merchant-info">
      Merchant? We'd love to hear from you! Reach out to us at
      <a href="mailto:nusdeck@gmail.com" class="email-link">nusdeck@gmail.com</a>
    </p>

    <div v-if="showTermsModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="closeTermsModal">&times;</button>
        <div class="terms-text" v-html="termsContent"></div>
        <button class="bottom-button" @click="closeTermsModal">Got it!</button>
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
import { GoogleAuthProvider } from 'firebase/auth'
import { getRedirectResult } from 'firebase/auth'

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
      termsContent: ''
    }
  },
  async created() {
    await this.loadTermsContent()
  },

  async mounted() {
    const result = await getRedirectResult(auth)
    if (result) {
      // User is signed in.
      const user = result.user
      console.log('User signed in:', user)
      // Here you can handle user data and save to Firestore if needed
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

    async loadTermsContent() {
      try {
        const response = await fetch('/termsandconditions.html')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        this.termsContent = await response.text()
      } catch (error) {
        console.error('Error loading terms content:', error)
      }
    },

    async signUpWithGoogle() {
      const provider = new GoogleAuthProvider()
      try {
        const userCredential = await auth.signInWithPopup(provider)
        const user = userCredential.user

        // Prepare user data
        const userData = {
          username: user.displayName,
          email: user.email,
          uid: user.uid,
          dateCreated: serverTimestamp(),
          profileType: 'Customer'
        }
        console.log(userData)

        // Save user data to Firestore
        await this.savetoFirestoreGoogle(userData)
      } catch (error) {
        console.error('Error during Google sign-up:', error)
      }
    },

    async savetoFirestore() {
      const { email, username, password, cPassword, agreeToTerms } = this
      const check = validateNewUser(email, username, password, cPassword, agreeToTerms)
      if (check['valid'] === false) {
        alert(check['message'])
        return
      }

      try {
        this.loading = true
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        await updateProfile(user, { displayName: username })

        const userData = {
          displayName: username,
          email: user.email,
          uid: user.uid,
          dateCreated: serverTimestamp(),
          profileType: 'Customer'
        }
        await setDoc(doc(db, 'UserProfile', user.uid), userData)

        this.resetForm()
        alert('Account Created Successfully!')
        this.$router.push('/custD')
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
    },
    async savetoFirestoreGoogle(userData) {
      // Check if userData is provided

      if (!userData) {
        const check = validateNewUser(
          userData['email'],
          userData['username'],
          'r2$8U)kg9j6;5m-a(VYRFc',
          'r2$8U)kg9j6;5m-a(VYRFc',
          true
        )
        if (check['valid'] === false) {
          alert(check['message'])
          return
        }

        try {
          this.loading = true
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            userData['email'],
            'r2$8U)kg9j6;5m-a(VYRFc'
          )
          const user = userCredential.user

          await updateProfile(user, { displayName: userData['username'] })

          userData = {
            displayName: userData['username'],
            email: user.email,
            uid: user.uid,
            dateCreated: serverTimestamp(),
            profileType: 'Customer'
          }
        } catch (error) {
          alert('Error creating account: ' + error.message)
          return
        } finally {
          this.loading = false
        }
      }

      // Save user data to Firestore
      try {
        await setDoc(doc(db, 'UserProfile', userData.uid), userData)
        this.resetForm()
        alert('Account Created Successfully!')
        this.$router.push('/custD')
      } catch (error) {
        console.error('Error saving user data to Firestore:', error)
      }
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

.inputBoxes {
  width: calc(100% - 20vw);
  border-radius: 0.25vw;
  font-family: 'Inria Sans', sans-serif;
  border: 0.1vw solid #00adb5;
  padding: 0.5vw;
  font-size: 1.5vw;
}

.inputTitles {
  color: #00adb5;
  font-size: 1.5vw;
  font-weight: bold;
  margin: 0.5vw 0 0.5vw;
}

.password-input {
  display: flex;
  align-items: center;
}

.toggle-password {
  margin-left: 0.8vw;
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
  margin-top: 0vh;
}

.save {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.google-signin {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.inputBoxes {
  width: 40vw;
  border-radius: 0.25vw;
  border: 2px solid #00adb5;
}

.inputTitles {
  color: #00adb5;
  font-size: 1.2vw;
  font-weight: bold;
}

button {
  background-color: #00adb5;
  font-weight: bold;
  font-size: 3vh;
  color: #ffffff;
  border-radius: 5px;
  border: none;
  height: 7vh;
  width: 20vw;
  font-family: 'Inria Sans', sans-serif;
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
  justify-content: flex-end;
  align-items: center;
  width: 40vw;
  margin-top: 5px;
  position: relative;
}

.show-password-wrapper {
  position: absolute;
  top: calc(100% + 15px);
  right: -25px;
  display: flex;
  align-items: center;
}

.show-password {
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
  font-weight: bold;
  white-space: nowrap;
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

.bottom-button {
  bottom: 15px;
  right: 15px;
  background: #00adb5;
  color: white;
  border: none;
  border-radius: 3px;
  width: 120px;
  height: 50px;
  font-size: 23px;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
  font-family: 'Inria Sans', sans-serif;
}

.bottom-button:hover {
  background-color: #007a80;
}

.terms-text {
  color: #00adb5;
  font-size: 16px;
  line-height: 1.5;
}

.bottom-close {
  position: absolute;
  bottom: 15px; /* Distance from the bottom */
  right: 15px; /* Distance from the right */
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

.bottom-close:hover {
  background-color: #007a80;
}
</style>
