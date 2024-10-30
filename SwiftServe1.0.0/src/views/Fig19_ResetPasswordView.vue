<template>
  <LoginHeader />
  <LoginScreen />
</template>

<script>
import LoginHeader from '@/components/FigX_UniversalHeader/LoginHeader.vue'
import ResetPassword from '@/components/Fig19_ResetPasswordPage/ResetPassword.vue'

export default {
  name: 'LoginView',
  components: {
    LoginHeader,
    ResetPassword
  },

  data() {}
}
</script>
