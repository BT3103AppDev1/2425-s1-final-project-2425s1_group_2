<template>
  <HeaderScreen />
  <div class='container'>

    <div class="profile">
      <ProfileComponent />
    </div>

    <div class="receipts">
      <Receipts />
    </div>

  </div>
</template>

<script>
import HeaderScreen from '@/components/FigX_UniversalHeader/UniversalHeader.vue'
import ProfileComponent from '@/components/Fig14_LiveReceiptsPage/LiveReceiptPage.vue'
import Receipts from '@/components/Fig14_LiveReceiptsPage/Receipts.vue'

export default {
  name: 'LiveReceiptPage',
  components: {
    HeaderScreen,
    ProfileComponent,
    Receipts
  },

  data() { }
}
</script>

<style>
.container {
  display: flex;
}

.profile {
  flex: 0 0 20vw;
}
</style>