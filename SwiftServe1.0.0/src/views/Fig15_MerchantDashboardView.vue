<template>
    <HeaderScreen/>
    <MerchantDashboard/>
</template>

<script>

import HeaderScreen from '@/components/FigX_UniversalHeader/MerchantUniversalHeader.vue'
import MerchantDashboard from '@/components/Fig15_MerchantDashboardPage/MerchantDashboard.vue'

export default {
  name: 'MerchantDashboardPage',
  components: {
    HeaderScreen,
    MerchantDashboard,
  }
}

</script>