
<template>
  <header>
    

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/hawker">Hawker</RouterLink>
      </nav>

    </div>
    
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
