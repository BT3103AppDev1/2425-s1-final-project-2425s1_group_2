<template>
  <div class="WelcomeBGImg" :style="{ 'background-image': 'url(/WelcomeBackgroundPic.png)' }">
    <div class="WelcomeContainer">
      <img src="/SwiftServeLogo.png" alt="SwiftServeLogo" class="SSLogo" />
      <h1> SwiftServe </h1>
      <br>

      <div id="LGSButton">
        <button @click="LGSClick">Let's Get Started</button>
      </div>
      <br><br><br>

      <h3> Already a Member? 
        <router-link to="/login" class="LoginLink">Log in</router-link>
      </h3>

      <br>
      <h3> 
        <router-link to="/login" class="LoginLink">Continue as Guest</router-link> 
      </h3>

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    LGSClick() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

.WelcomeBGImg {
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.WelcomeContainer {
  width: 100%;
  margin-bottom: 5%;
  text-align: center;
}

.SSLogo {
  width: 20vw;
}

button {
  background-color: #00ADB5;
  font-weight: bold;
  font-size: 3vh;
  font-family: 'Inria Sans';
  color: white;
  border-radius: 5px;
  border: none;
  height: 8vh;
  width: 20vw;
}

h1 {
  color: #00ADB5;
  font-weight: bold;
  font-family: 'Mada';
  font-size: 9vh;
}

h3 {
  height: 5vh;
  width: 50vw;
  font-size: 3vh;
  font-family: 'Inria Sans';
  color: #00ADB5;
  margin-left: 25%;
}

.LoginLink {
  color: #00ADB5;
  font-weight: bold;
}

</style>