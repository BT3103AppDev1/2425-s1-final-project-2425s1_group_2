<template>
  <HeaderScreen />
  <ProfileComponent />
</template>

<script>
import HeaderScreen from '@/components/FigX_UniversalHeader/UniversalHeader.vue'
import ProfileComponent from '@/components/Fig14_LiveReceiptsPage/LiveReceiptPage.vue'

export default {
  name: 'ProfilePage',
  components: {
    HeaderScreen,
    ProfileComponent
  },

  data() {}
}
</script>
