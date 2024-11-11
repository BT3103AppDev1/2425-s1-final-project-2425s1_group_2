<template>
  <div class="WelcomeBGImg" :style="{ 'background-image': 'url(/WelcomeBackgroundPic.png)' }">
    <div class="WelcomeContainer">
      <img src="/SwiftServeLogo.png" alt="SwiftServeLogo" id="SSLogo" />
      <h1 class="title">SwiftServe</h1>

      <div id="SignUpButton">
        <button @click="LGSClick" class="LGSButton">Let's Get Started</button>
      </div>

      <h3 id="member">
        Already a Member?
        <router-link to="/login" class="Link">Log in</router-link>
      </h3>

      <h3 id="guest">
        <span class="Link" id="guest" @click="signInAnonymously">Continue as Guest</span>
      </h3>
    </div>
  </div>
</template>

<script>
import { signInAnonymously, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase.js'

export default {
  methods: {
    LGSClick() {
      this.$router.push('/signup').then(() => {
        location.reload()
      })
    },
    // signInAnonymously() {
    //   signInAnonymously(auth)
    //     .then(() => {
    //       this.$router.push('/diningOptions') //changed from CustD because it doesnt make sense to go to empty dashboard - Javier
    //     })
    //     .catch((error) => {
    //       console.error('Error signing in anonymously:', error)
    //     })
    // }
    async signInAnonymously() {
      try {
        const userCredential = await signInAnonymously(auth)
        const user = userCredential.user
        await updateProfile(user, { displayName: 'Guest' })
        this.$router.push('/custD')
      } catch (error) {}
    }
  }
}
</script>

<style scoped>
.WelcomeBGImg {
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.WelcomeContainer {
  text-align: center;
  font-family: 'Inria Sans', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
}

/* Logo appears at 
      height: (20%height,40%height), 
      width: (max(35% width, 50%width -10%height),
             max(65% width, 50%width +10%height)) 
*/
#SSLogo {
  position: absolute;
  left: 50%;
  top: 20%;
  height: 20vh;
  max-width: 30vw;
  object-fit: contain;
  transform: translateX(-50%);
}

/* Button styling */
#SignUpButton {
  margin-top: 3vh;
  position: absolute;
  top: 55%;
}

button {
  position: relative;
  overflow: hidden;
  background-color: #00adb5;
  font-weight: bold;
  color: white;
  border-radius: 10px;
  border: none;
  height: 8vh;
  width: 20vw;
  cursor: pointer;
  font-size: clamp(1rem, 2.5vw, 3.5vh);
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
  transition: background-color 0.3s ease-in-out;
  font-family:
    Inria Sans,
    sans-serif;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.1)
  );
  z-index: 0;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

button:hover::before {
  opacity: 1;
  animation: waveAnimation 1.2s forwards;
}

@keyframes waveAnimation {
  0% {
    left: -150%;
  }
  100% {
    left: 150%;
  }
}

button span {
  position: relative;
  z-index: 2;
}

button:hover {
  background-color: #007a80;
}

.title {
  font-family: 'Mada', sans-serif;
  font-size: clamp(2.5rem, 5vw, 9vh);
  color: #00adb5;
  font-weight: 600; /* semibold*/
  margin-top: 2vh;
}

h3 {
  font-size: clamp(1rem, 2vw, 3vh);
  color: #00adb5;
  margin-top: 2vh;
}

#member {
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translateX(-50%);
  font-size: clamp(1rem, 2.5vw, 3vh);
  white-space: nowrap;
}

#guest {
  position: absolute;
  left: 50%;
  top: 80%;
  transform: translateX(-50%);
  font-size: clamp(1rem, 2.5vw, 3vh);
  white-space: nowrap;
}

.Link {
  color: #00adb5;
  font-weight: bold;
  text-decoration: underline;
}

.Link:hover {
  color: #007a80;
}
</style>
