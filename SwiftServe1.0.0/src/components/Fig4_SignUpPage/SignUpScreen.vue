<template>
  <div class="container">
    <form id="userForm">
      <div class="formData">
        <div id="inputForm">
          <h2 class="inputTitles">Email:</h2>
          <input type="text" class="inputBoxes" id="email1" required="" /> <br />

          <h2 class="inputTitles">Username:</h2>
          <input type="text" class="inputBoxes" id="username1" required="" /> <br />

          <h2 class="inputTitles">Password:</h2>
          <input type="text" class="inputBoxes" id="password1" required="" /> <br />

          <h2 class="inputTitles">Confirm password:</h2>
          <input type="text" class="inputBoxes" id="cPassword1" required="" /> <br /><br />
        </div>
      </div>
      <div class="save">
        <button id="savebutton" type="button" v-on:click="savetoFirestore()">Sign Up</button>
        <br /><br />
      </div>
    </form>
  </div>
</template>

<script>
import firebaseApp from '../../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { doc, setDoc, addDoc, serverTimestamp, collection } from 'firebase/firestore'
const db = getFirestore(firebaseApp)

export default {
  methods: {
    async savetoFirestore() {
      let email = document.getElementById('email1').value
      let username = document.getElementById('username1').value
      let password = document.getElementById('password1').value
      let cPassword = document.getElementById('cPassword1').value

      try {
        if (password === cPassword) {
          const userRef = await addDoc(collection(db, 'UserProfile'), {
            DateCreated: serverTimestamp(),
            Email: email,
            Username: username,
            password: password,
            ProfileType: 'Customer'
          })
          const userId = userRef.id

          await setDoc(doc(db, 'UserProfile', userId), {
            UserId: userId,
            DateCreated: serverTimestamp(),
            Email: email,
            Username: username,
            password: password,
            ProfileType: 'Customer'
          })

          document.getElementById('userForm').reset()
          alert('Account Created Successfully!')
        } else {
          throw new Error('Passwords do not match!')
        }
      } catch (error) {
        console.error('Error adding document: ', error)
        alert('No Account Created.' + error)
      }
    }
  }
}
</script>

<style scoped>
.formData {
  display: flex;
  margin-left: 30vw;
  margin-top: 20vh;
}

.save {
  margin-left: 40vw;
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
</style>
