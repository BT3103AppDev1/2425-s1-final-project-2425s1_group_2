<template>
  <HeaderScreen />
  <div class="profile-page">
    <div class="profile-left">
      <ProfileComponent />
    </div>
    <div class="profile-right">
      <UpdateSettings />
    </div>
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
  }
}
</script>

<style scoped>
/* Layout for the profile page */
.profile-page {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh; /* Take up the entire viewport height */
  padding: 20px;
  box-sizing: border-box;
}

.profile-left {
  flex: 1; /* This takes up 1 part of the total width (25%) */
  margin-right: 20px; /* Add some spacing between the two sections */
}

.profile-right {
  flex: 3; /* This takes up 3 parts of the total width (75%) */
  background-color: #f9f9f9; /* Optional: Add background color for differentiation */
  padding: 20px;
}
</style>
