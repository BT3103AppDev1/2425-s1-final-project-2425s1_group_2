<template>
  <HeaderScreen />
  <CustDScreen />
</template>

<script>
import HeaderScreen from '@/components/FigX_UniversalHeader/UniversalHeader.vue'
import CustDScreen from '@/components/Fig7_CustDashboardPage/CustOrders.vue'

export default {
  name: 'CustDashboardPage',
  components: {
    HeaderScreen,
    CustDScreen,
  },

  data() { },
}
</script>
