
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

</style>
