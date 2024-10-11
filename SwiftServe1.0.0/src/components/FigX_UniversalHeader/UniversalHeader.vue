<template>
    <div class="headerContainer">
        <div id="logo">
            <img src="/SwiftServeLogo.png" alt="SwiftServeLogo" class="SSLogo" />
            <h1> SwiftServe </h1>
        </div>

        <div class="welcomeCust">
            <h2> Welcome Spencer TBC </h2>
        </div>

        <img src="/dashboardButton.png" alt="DashboardButton" class="headerButtons" id="dButton" @click="CDashClick"/>
        <img src="/settingsButton.png" alt="SettingsButton" class="headerButtons" id="sButton" @click="SettingsClick"/>
        <img src="/logoutButton.png" alt="LogoutButton" class="headerButtons" id="lButton" @click="LogoutClick"/>
    
    </div>
</template>

<script>
export default {
  methods: {
    CDashClick() {
      //logout from firebase. NOT DONE YET.
      this.$router.push('/custD');
    },

    //SettingsClick. NOT DONE YET.
    
    LogoutClick() {
      this.$router.push('/');
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
    width: 7vw;
}

h1 {
  color: #00ADB5;
  font-weight: bold;
  font-family: 'Mada';
  font-size: 5vh;
}

.welcomeCust {
    position: absolute;
    left: 40vw;
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
