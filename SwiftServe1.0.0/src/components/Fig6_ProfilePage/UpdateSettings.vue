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
  import firebaseApp from '@/firebase.js';
  import { getFirestore } from 'firebase/firestore';
  import { getAuth, updatePassword, onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential, updateProfile} from 'firebase/auth';

  
  export default {
    name: 'UpdateSettings',
    data() {
    return {
      user:false,
    }
  },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
          if (user) {
              this.user = user;
              console.log(this.user);
              console.log(this.user.displayName);
          }
      })
  },
    methods: {
      async savetoFirestore() {
        let username = document.getElementById("username1").value;
        let password = document.getElementById("password1").value;
        let cPassword = document.getElementById("cPassword1").value;
  
        try {
          if (username && username != this.user.displayName) {
            await updateProfile(this.user, {displayName: username}).then(() => {
              alert("Username successfully changed!");
            });
          }
          if (!password || !cPassword) {
            alert("Please fill in both password fields!");
          } else if (password === cPassword) {
              // Reauthenticate the user using their email and current password
              const credential = EmailAuthProvider.credential(this.user.email, password);
              await reauthenticateWithCredential(this.user, credential);
              await updatePassword(this.user,password).then(() => {
                console.log("Password change successful");
              alert('Password updated successfully!');
            });
          } else {
            alert("Passwords do not match!");
          }

        } catch (error) {
          console.error("Error adding document: ", error);;
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
    font-size: 20px;
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
  