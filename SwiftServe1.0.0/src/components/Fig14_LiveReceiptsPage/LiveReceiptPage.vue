<template>
  <div class="profile-container">
      <div class="profile-info">
        <div class="avatar">
          <img src="/ProfilePicture.png" alt="User Avatar" />
        </div>
        <div class="info-text">
          <h2>{{ name }}</h2>
          <p>{{ email }}</p>
        </div>
      </div>
      <div class="actions">
        <router-link to="/profile" class="action-link">
          <button @click="updateSettings">
            <img src="/UpdateSettings.png" alt="Update Settings" class="icon" />
            <span>Update Settings</span>
          </button>
        </router-link>
        <router-link to="/livereceipt" class="action-link">
          <button @click="showRecentOrder">
            <img src="/RecentOrder.png" alt="Recent Order" class="icon" />
            <span>Most Recent Order Receipt</span>
          </button>
        </router-link>
        <button @click="deleteAccount">
          <img src="/DeleteAccount.png" alt="Delete Account" class="icon"/>
          <span>Delete Account</span>
        </button>
      </div>
  </div>
</template>

<script>
import firebaseApp from '@/firebase.js';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged,EmailAuthProvider, reauthenticateWithCredential, deleteUser  } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  name: 'ProfileComponent',

  data() {
    return {
      name: '',
      email: '',
      user:false,
    }
  },

  mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
          if (user) {
              this.user = user;
              this.setProfile()
          }
      })
  },

  methods: {
    setProfile() {
      this.name = this.user.displayName;
      this.email = this.user.email;
    },
    updateSettings() {
      console.log('Update settings clicked')
    },
    showRecentOrder() {
      console.log('Show recent order clicked')
    },
    async deleteAccount() {
      try {
        const currentPassword = prompt('Please enter your current password to confirm account deletion:');

        if (currentPassword) {
          // Reauthenticate the user with their email and current password
          const credential = EmailAuthProvider.credential(this.email, currentPassword);
          await reauthenticateWithCredential(this.user, credential);
        } else {
            alert("Reauthentication failed: No password provided.");
            return;  // Exit if no password is provided
        }
        // Delete the user's Firestore profile document (optional)
        const userDocRef = doc(db, "UserProfile", this.user.uid); // Adjust Firestore path as needed
        await deleteDoc(userDocRef);
        console.log('User profile deleted from Firestore.');

        // Delete the user from Firebase Authentication
        await deleteUser(this.user);
        alert('Account deleted successfully.');
        console.log('User account deleted from Firebase Authentication.');
        this.$router.push('/'); // Adjust the route as needed
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Error deleting account: ' + error.message);
    }
  },
},
}
</script>

<style scoped>
.profile-container {
  background-color: #00adb5;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Inria Sans', sans-serif;
  align-items: flex-start;
  width: 15vw;
}

.profile-info {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: 20px;
  margin-top: 80px;
}

.avatar img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ffffff;
  margin-bottom: 10px;
}

.info-text {
  text-align: center;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 20px;
  margin-left: 20px;
}

/* Button styles */
button {
  background: none;
  border: none;
  color: white;
  text-align: left;
  padding: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
}

button .icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

/* Remove underline from router-link */
.action-link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
}

/* Remove the underline from links inside router-link */
.action-link span {
  text-decoration: none;
  color: white; /* Ensures text inherits button color */
}

.action-link:hover span {
  color: #f1f1f1; /* Optional: adds a hover effect */
}
</style>
