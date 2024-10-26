<template>
    <HeaderScreen />
    <OrdersPage />
    <!-- <MReceipt /> -->
  </template>
  
  <script>
  // import HomeScreen from "@/components/Fig3_WelcomePage/HomeScreen.vue";
  
  import OrdersPage from '@/components/Fig17_MerchantOrdersPage/OrdersPage.vue'
  import HeaderScreen from '@/components/FigX_UniversalHeader/UniversalHeader.vue'
//   import MReceipt from '@/components/Fig17_MerchantOrdersPage/MReceipt.vue'
  
  export default {
    name: 'merchantOrders',
    components: {
      HeaderScreen,
      OrdersPage,
    //   MReceipt
    },
  
    data() {}
  }
  </script>
  