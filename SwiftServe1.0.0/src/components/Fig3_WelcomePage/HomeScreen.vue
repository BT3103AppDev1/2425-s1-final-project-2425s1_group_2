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
        <router-link to="/custD" class="Link" id="guest">Continue as Guest</router-link>
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
};
</script>

<style scoped>
/* Background image container */
.WelcomeBGImg {
width: 100vw;
height: 100vh;
background-color: #FFFFFF;
background-repeat: no-repeat;
background-size: cover;
background-position: center;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden; /* Prevent scrolling */
}

/* Container for content */
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
  max-width: 30vw; /* Ensure it doesn't exceed 30% of the width */
  object-fit: contain;
  transform: translateX(-50%);
}

/* Button styling */
#SignUpButton {

margin-top: 3vh;
position: absolute;
top: 55%; /* Positioning at 60% of the screen height */
}

button {
background-color: #00adb5;
font-weight: bold;
color: white;
border-radius: 5px;
border: none;
height: 8vh; /* Make the button occupy 60-68% of the page's height */
width: 20vw;
cursor: pointer;
font-size: clamp(1rem, 2.5vw, 3.5vh);
padding: 0.5rem 1rem;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
}

button:hover {
background-color: #007a80;
}

.title {
font-family: 'Mada', sans-serif;
font-size: clamp(2.5rem, 5vw, 9vh);
color: #00adb5;
font-weight: bold;
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