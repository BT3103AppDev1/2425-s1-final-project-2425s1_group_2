<template>
  <LoginHeader />
  <LoginScreen />
</template>

<script>
import LoginHeader from '@/components/FigX_UniversalHeader/LoginHeader.vue'
import LoginScreen from '@/components/Fig5_LoginPage/LoginScreen.vue'

export default {
  name: 'LoginView',
  components: {
    LoginHeader,
    LoginScreen
  },

  data() {}
}
</script>
