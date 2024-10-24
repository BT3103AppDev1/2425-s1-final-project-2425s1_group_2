<template>
  <HeaderScreen />
  <CustDScreen />
  <!---<CustHistoryScreen />-->
</template>

<script>
import HeaderScreen from '@/components/FigX_UniversalHeader/UniversalHeader.vue'
import CustDScreen from '@/components/Fig7_CustDashboardPage/CustOrders.vue'
//import CustHistoryScreen from '@/components/Fig7_CustDashboardPage/CustOrderHistory.vue'

export default {
  name: 'CustDashboardPage',
  components: {
    HeaderScreen,
    CustDScreen,
    //CustHistoryScreen
  },

  data() {}
}
</script>
