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
    </div>
  </template>
  
  <script>
  import firebaseApp from '../../firebase.js';
  import { getFirestore } from 'firebase/firestore';
  import { doc, setDoc, addDoc, serverTimestamp, collection } from 'firebase/firestore';
  const db = getFirestore(firebaseApp);
  
  export default {
    name: 'UpdateSettings',
    methods: {
      async savetoFirestore() {
        let email = document.getElementById("email1").value;
        let username = document.getElementById("username1").value;
        let password = document.getElementById("password1").value;
        let cPassword = document.getElementById("cPassword1").value;
  
        try {
          if (password === cPassword) {
            const userRef = await addDoc(collection(db, "UserProfile"), {
              DateCreated: serverTimestamp(),
              Email: email,
              Username: username,
              password: password,
              ProfileType: "Customer"
            });
            const userId = userRef.id;
  
            await setDoc(doc(db, "UserProfile", userId), {
              UserId: userId,
              DateCreated: serverTimestamp(),
              Email: email,
              Username: username,
              password: password,
              ProfileType: "Customer"
            });
  
            document.getElementById('userForm').reset();
            alert("Account Created Successfully!");
          } else {
            throw new Error("Passwords do not match!");
          }
        } catch (error) {
          console.error("Error adding document: ", error);
          alert("No Account Created." + error);
        }
      }
    }
  };
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
    width: 50vw; /* Increase the width */
    height: 5vh; /* Increase the height */
    border-radius: 5px;
    border: 2px solid #00ADB5;
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
    height: 7vh; /* Increase the height of the button */
    width: 25vw; /* Increase the width of the button */
  }
  </style>
  