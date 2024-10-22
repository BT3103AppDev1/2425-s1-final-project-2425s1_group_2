<template>
  <div class="headerContainer">
    <div id="logo">
      <img src="/SwiftServeLogoHoriz.png" alt="SwiftServeLogoHoriz" class="SSLogo" />
    </div>

    <div class="welcomeCust">
      <h2>Welcome {{ this.user.displayName }}!</h2>
    </div>

    <img
      src="/dashboardButton.png"
      alt="DashboardButton"
      class="headerButtons"
      id="dButton"
      @click="CDashClick"
    />
    <img
      src="/settingsButton.png"
      alt="SettingsButton"
      class="headerButtons"
      id="sButton"
      @click="SettingsClick"
    />
    <img
      src="/logoutButton.png"
      alt="LogoutButton"
      class="headerButtons"
      id="lButton"
      @click="LogoutClick"
    />
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"
export default {
  name: 'UniversalHeader',

  data() {
    return {
        user:false,
    }
  },

  mounted(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
    })
  },

  methods: {
    CDashClick() {
      this.$router.push('/custD')
    },

    SettingsClick() {
      this.$router.push('/profile')
    },

    LogoutClick() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.headerContainer {
  display: flex;
  align-items: center;
}

#logo {
  display: flex;
  align-items: center;
}

img {
  width: 20vw;
  margin-left: 1vw;
}

h1 {
  color: #00adb5;
  font-weight: bold;
  font-family: 'Mada';
  font-size: 5vh;
}

.welcomeCust {
  position: absolute;
  left: 35vw;
  font-size: 3vh;
}

.headerButtons {
  width: 4vw;
}

#dButton {
  position: absolute;
  left: 83vw;
}

#sButton {
  position: absolute;
  left: 89vw;
}

#lButton {
  position: absolute;
  left: 95vw;
}
</style>
