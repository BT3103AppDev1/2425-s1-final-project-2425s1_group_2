<template>
  <SignUpHeader />
  <SignUpScreen />
</template>

<script>
import SignUpHeader from '@/components/FigX_UniversalHeader/SignUpHeader.vue'
import SignUpScreen from '@/components/Fig4_SignUpPage/SignUpScreen.vue'

export default {
  name: 'SignUpView',
  components: {
    SignUpHeader,
    SignUpScreen
  },

}
</script>
