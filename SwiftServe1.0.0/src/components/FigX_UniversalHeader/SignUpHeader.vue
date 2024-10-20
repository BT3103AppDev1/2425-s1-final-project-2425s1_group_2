<template>
  <div class="headerContainer">
    <div id="logo" @click="goHome">
      <img src="/SwiftServeLogoHoriz.png" alt="SwiftServeLogoHoriz" class="SSLogo" />
    </div>

    <div id="signUpButton">
      <button @click="goLoginClick">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goLoginClick() {
      this.$router.push('/login')
    },
    goHome() {
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

#signUpButton {
  position: absolute;
  left: 85vw;
}

button {
  background-color: #00adb5;
  font-weight: bold;
  font-size: 3vh;
  color: white;
  border-radius: 5px;
  border: none;
  height: 5vh;
  width: 10vw;
}
</style>
