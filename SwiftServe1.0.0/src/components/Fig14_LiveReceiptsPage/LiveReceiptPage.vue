<template>
    <div class="profile-container">
      <div class="avatar">
        <img src="/placeholder.svg?height=100&width=100" alt="User Avatar" />
      </div>
      <h2>{{ name }}</h2>
      <p>{{ email }}</p>
      <div class="actions">
        <button @click="updateSettings">
          <i class="icon-settings"></i> Update Settings
        </button>
        <button @click="showRecentOrder">
          <i class="icon-clock"></i> Most Recent Order Receipt
        </button>
        <button @click="deleteAccount">
          <i class="icon-trash"></i> Delete Account
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
        // Implement update settings logic
        console.log('Update settings clicked')
      },
      showRecentOrder() {
        // Implement show recent order logic
        console.log('Show recent order clicked')
      },
      deleteAccount() {
        // Implement delete account logic
        console.log('Delete account clicked')
      }
    }
  }
  </script>
  
  <style scoped>
  .profile-container {
    background-color: #00b8d4;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }
  
  .avatar img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #ffffff;
  }
  
  .actions {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
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
  }
  
  button i {
    margin-right: 10px;
  }
  </style>