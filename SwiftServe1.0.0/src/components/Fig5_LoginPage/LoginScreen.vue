<template>
  <div class="login-page">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          :type="showPassword ? 'text' : 'text'"
          id="password"
          v-model="password"
          :style="{ '-webkit-text-security': showPassword ? 'none' : 'disc' }"
          required
        />
      </div>

      <div class="form-actions">
        <a href="#" class="forgot-password" @click.prevent="handleForgotPassword"
          ><u>Forgot Password?</u></a
        >
        <div class="show-password">
          <input type="checkbox" id="showPassword" v-model="showPassword" />
          <label for="showPassword">Show Password</label>
        </div>
      </div>

      <button type="submit" class="login-button">Login</button>

      <button class="google-login-button" @click="handleGoogleSignIn">Sign in with Google</button>
    </form>

    <!-- Firebase UI Auth Container -->
    <!-- <div id="firebaseui-auth-container" v-show="!showManualLogin"></div>
    <button v-show="showManualLogin" @click="toggleLoginMethod">Sign in using other methods</button> -->
    <!-- <button v-show="!showManualLogin" @click="toggleLoginMethod">Go Back to Manual Login</button> -->
  </div>
</template>

<script>
//import * as firebaseui from 'firebaseui'
// import {EmailProvider} from '@/firebase.js'
import { auth, GoogleProvider, db } from '@/firebase.js'
import 'firebaseui/dist/firebaseui.css'
import { signInWithEmailAndPassword, linkWithCredential, GoogleAuthProvider } from 'firebase/auth'
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false
      //showManualLogin: true
    }
  },
  // mounted() {
  //   this.initializeFirebaseUI()
  // },
  methods: {
    async handleLogin() {
      try {
        // Attempt to sign in the user with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password)
        const user = userCredential.user

        // Log user data for verification purposes
        console.log('Login successful:', user)

        const userProfileDoc = await db.collection('UserProfile').doc(user.uid).get()

        if (userProfileDoc.exists) {
          const userData = userProfileDoc.data()
          const profileType = userData.profileType

          // Redirect based on profileType
          if (profileType === 'Merchant') {
            this.$router.push('/merchantDashboard') // Replace with the actual route for merchant home page
          } else {
            this.$router.push('/custD') // Customer dashboard route
          }
        } else {
          alert('User profile data not found.')
        }

        // Redirect to the customer dashboard after successful login
        // this.$router.push('/custD')
      } catch (error) {
        // Handle authentication errors
        alert('Error during login: ' + error.message)
      }
    },
    handleForgotPassword() {
      this.$router.push('/resetPassword')
    },
    // toggleLoginMethod() {
    //   // Toggle between showing manual login and FirebaseUI-based login
    //   this.showManualLogin = !this.showManualLogin
    // },
    async handleGoogleSignIn() {
      const provider = new GoogleAuthProvider()
      var userCredential
      try {
        const userCredential = await auth.signInWithPopup(provider)
        const user = userCredential.user
        const userProfileDoc = await db.collection('UserProfile').doc(user.uid).get()

        if (userProfileDoc.exists) {
          const userData = userProfileDoc.data()
          const profileType = userData.profileType

          // Redirect based on profileType
          if (profileType === 'Merchant') {
            this.$router.push('/merchantDashboard') // Redirect to merchant dashboard
          } else {
            this.$router.push('/custD') // Redirect to customer dashboard
          }
        } else {
          alert('We are unable to find your profile, try signing up first!')
        }
      } catch (error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          const email = error.email
          const methods = await auth.fetchSignInMethodsForEmail(email)

          // Handle existing email/password account
          if (methods.includes('password')) {
            alert(
              'An account already exists with this email. Would you like to link your Google account to it?'
            )
            // Prompt to link accounts
            const credential = GoogleProvider.credential(userCredential.credential.idToken)
            try {
              const usercred = await linkWithCredential(auth.currentUser, credential)
              console.log('Account linking success', usercred.user)
              this.$router.push('/custD')
            } catch (linkError) {
              console.log('Account linking error', linkError)
              alert('Error linking account: ' + linkError.message)
            }
          } else {
            alert('Please sign in using the existing method.')
          }
        } else {
          alert('Error during Google sign-in: ' + error.message)
        }
      }
    }
    // initializeFirebaseUI() {
    //   // Import FirebaseUI instance and initialize it with the `auth` from firebase.js
    //   const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)

    //   const uiConfig = {
    //     signInFlow: 'popup', // Use popup for sign-in to maintain SPA flow
    //     signInOptions: [
    //       GoogleProvider.providerId, // Allow Google sign-in
    //       EmailProvider.providerId // Allow email sign-in
    //     ],
    //     callbacks: {
    //       signInSuccessWithAuthResult: async (authResult) => {
    //         // Extract user information from the authResult
    //         const user = authResult.user

    //         // Extract user details
    //         const displayName = user.displayName || 'Anonymous User'
    //         const email = user.email || 'No email provided'
    //         const uid = user.uid

    //         try {
    //           // Save user data to Firestore
    //           const userData = {
    //             displayName: displayName,
    //             email: email,
    //             uid: uid,
    //             dateCreated: new Date().toISOString(), // Using new Date() instead of serverTimestamp() to serialize correctly for cookies
    //             profileType: 'Customer'
    //           }
    //           console.log('User data saved to Firestore:', userData)

    //           // Redirect to home page after successful sign-in
    //           this.$router.push('/custD')
    //         } catch (error) {
    //           console.error('Error saving user data to Firestore:', error)
    //         }
    //         return false // Prevent the automatic redirect to avoid default behavior
    //       }
    //     }
    //   }

    //   // Start the FirebaseUI with the configuration defined above
    //   ui.start('#firebaseui-auth-container', uiConfig)
    // }
  }
}
</script>

<style scoped>
.login-page {
  font-family: 'Inria Sans', sans-serif;
  background-color: #ffffff;
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
  margin-top: -50px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 1vh;
  color: #00adb5;
  font-size: 18px;
  font-weight: bold;
}

input[type='email'],
input[type='password'],
input[type='text'] {
  width: 100%;
  padding: 1vh;
  border: 2px solid #00adb5;
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
  color: #00adb5;
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
  border: #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  top: 2px;
  left: 4px;
}

.show-password label {
  color: #00adb5;
  font-size: 18px;
}

.login-button,
.google-login-button {
  width: 100%;
  background-color: #00adb5;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 5px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  font-family:
    Inria Sans,
    sans-serif;
  box-sizing: border-box;
}

.google-login-button {
  margin-top: 20px;
}

.login-button:hover,
.google-login-button:hover {
  background-color: #007a80;
}

button:hover {
  background-color: #007a80;
}

.toggle-button {
  margin-top: 20px;
  width: 100%;
  background-color: #00adb5;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 5px;
  font-size: 21px;
  font-weight: bold;
  cursor: pointer;
  font-family:
    Inria Sans,
    sans-serif;
  box-sizing: border-box;
}

.toggle-button:hover {
  background-color: #007a80;
}
</style>
