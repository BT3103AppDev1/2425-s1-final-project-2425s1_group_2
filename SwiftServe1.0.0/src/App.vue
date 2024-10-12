<<<<<<< HEAD
<template>
  <header>
    <!--
    <div class="nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
=======
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/hawker">Hawker</RouterLink>
      </nav>
>>>>>>> cedric-09/10-HawkerCentrePage
    </div>
    -->
  </header>

  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inria+Sans:wght@400;700&display=swap');

</style>
