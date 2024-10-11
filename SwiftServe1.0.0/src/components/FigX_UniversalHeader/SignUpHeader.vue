<template>
    <div class="headerContainer">
        <div id="logo">
            <img src="/SwiftServeLogo.png" alt="SwiftServeLogo" class="SSLogo" />
            <h1> SwiftServe </h1>
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
      this.$router.push('/login');
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

#signUpButton {
    position: absolute;
    left: 88vw;
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
