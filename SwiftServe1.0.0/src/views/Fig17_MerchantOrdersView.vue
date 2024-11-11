<template>
  <HeaderScreen />
  <OrdersPage />
</template>

<script>

import OrdersPage from '@/components/Fig17_MerchantOrdersPage/OrdersPage.vue'
import HeaderScreen from '@/components/FigX_UniversalHeader/MerchantUniversalHeader.vue'

export default {
  name: 'merchantOrders',
  components: {
    HeaderScreen,
    OrdersPage,
  },

  data() { }
}
</script>