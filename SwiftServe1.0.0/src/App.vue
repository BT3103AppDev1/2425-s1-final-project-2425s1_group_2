
<template>
  <header>
    

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/hawker">Hawker</RouterLink>
        <RouterLink to = /payment>Payment</RouterLink>
        <RouterLink to = /profile>Profile</RouterLink>
        <RouterLink to = /livereceipt>Live Receipt</RouterLink>
        <RouterLink to = /checkout>Checkout</RouterLink>

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
