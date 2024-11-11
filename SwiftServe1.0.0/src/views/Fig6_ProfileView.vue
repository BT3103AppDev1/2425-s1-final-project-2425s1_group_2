<template>
  <HeaderScreen />

  <div class='container'>
    <ProfileComponent ref="profileComponent" />
    <UpdateSettings @updateProfile="refreshProfileComponent" />
  </div>
</template>

<script>
import HeaderScreen from "@/components/FigX_UniversalHeader/UniversalHeader.vue";
import ProfileComponent from "@/components/Fig14_LiveReceiptsPage/LiveReceiptPage.vue";
import UpdateSettings from "@/components/Fig6_ProfilePage/UpdateSettings.vue";

export default {
  name: 'ProfilePage',
  components: {
    HeaderScreen,
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
