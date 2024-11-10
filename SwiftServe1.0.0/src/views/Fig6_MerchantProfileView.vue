<template>
  <HeaderScreenMerchant />

  <div class='container'>
    <ProfileComponent ref="profileComponent" />
    <UpdateSettings @updateProfile="refreshProfileComponent" />
  </div>
</template>

<script>
import HeaderScreenMerchant from "@/components/FigX_UniversalHeader/MerchantUniversalHeader.vue";
import ProfileComponent from "@/components/Fig14_LiveReceiptsPage/MerchantLiveReceiptPage.vue";
import UpdateSettings from "@/components/Fig6_ProfilePage/UpdateSettings.vue";

export default {
  name: 'ProfilePage',
  components: {
    HeaderScreenMerchant,
    ProfileComponent,
    UpdateSettings
  },
  methods: {
    refreshProfileComponent() {
      this.$refs.profileComponent.setProfile();
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
}
</style>