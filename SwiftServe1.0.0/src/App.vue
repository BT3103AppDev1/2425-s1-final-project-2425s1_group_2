<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/hawkerCentre">Hawker Centre Page</RouterLink>
      </nav>

    </div>
  </header>

  <router-view />
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'App'
}
</script>

<style scoped></style>
