<template>
    <div class="headerContainer">
        <div id="logo" @click="goHome">
            <img src="/SwiftServeLogoHoriz.png" alt="SwiftServeLogoHoriz" class="SSLogo" />
        </div>

        <div id="signUpButton">
            <button @click="goSignUpClick">Sign Up</button>
        </div>
    
    </div>
</template>

<script>
//Welcome Spencer TBC not done yet
export default {
  methods: {
    goSignUpClick() {
      this.$router.push('/signup');
    },
    goHome() {
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
    width: 20vw;
}

h1 {
    color: #00ADB5;
    font-weight: bold;
    font-family: 'Mada';
    font-size: 5vh;
}

#signUpButton {
    position: absolute;
    left: 85vw;
}

button {
    background-color: #00ADB5;
    font-weight: bold;
    font-size: 3vh;
    color: white;
    border-radius: 5px;
    border: none;
    height: 5vh;
    width: 10vw;
}

</style>
