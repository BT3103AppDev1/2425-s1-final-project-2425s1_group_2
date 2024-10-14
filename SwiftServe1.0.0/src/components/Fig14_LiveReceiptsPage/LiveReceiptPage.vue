<template>
    <div class="profile-container">
      <div class="profile-info">
        <div class="avatar">
          <img src="/ProfilePicture.png" alt="User Avatar" />
        </div>
        <div class = "info-text">
        <h2>{{ name }}</h2>
        <p>{{ email }}</p>
        </div>
      </div>
      <div class="actions">
        <button @click="updateSettings">
          <img src="/UpdateSettings.png" alt="Update Settings" class="icon" />
          <span>Update Settings</span>
        </button>
        <button @click="showRecentOrder">
          <img src="/RecentOrder.png" alt="Recent Order" class="icon" />
          <span>Most Recent Order Receipt</span>
        </button>
        <button @click="deleteAccount">
          <img src="/DeleteAccount.png" alt="Delete Account" class="icon" />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfileComponent',
    data() {
      return {
        name: 'Spencer',
        email: 'Foodlover123@hotmail.com'
      }
    },
    methods: {
      updateSettings() {
        console.log('Update settings clicked')
      },
      showRecentOrder() {
        console.log('Show recent order clicked')
      },
      deleteAccount() {
        console.log('Delete account clicked')
      }
    }
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
  }
  
  .profile-info {
    display: flex;
    flex-direction: column;
    text-align: center; /* Left-align text */
    margin-left: 20px; /* Add left margin to move the section from the page edge */
    margin-top: 80px;
    text-align: center;
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
    align-items: flex-start; /* Keep actions aligned to the left */
    width: 100%;
    margin-top: 20px;
    margin-left: 20px;
  }
  
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
  </style>
  