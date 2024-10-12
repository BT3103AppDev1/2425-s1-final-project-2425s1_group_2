<template>
    <HeaderScreen/>
    <ReceiptComponent/>
    </template>
    
    <script>
    import HeaderScreen from "@/components/FigX_UniversalHeader/UniversalHeader.vue";
    import ReceiptComponent from "@/components/Fig11_CheckoutPage/CheckoutPage.vue";
    
    export default {
      name: 'CheckoutPage',
      components: {
        HeaderScreen,
        ReceiptComponent
      },
    
      data() {
    
      }
    }
    </script>