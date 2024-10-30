<template>
  <SignUpHeader />
  <ResetPassword />
</template>

<script>
import SignUpHeader from '@/components/FigX_UniversalHeader/SignUpHeader.vue'
import ResetPassword from '@/components/Fig19_ResetPasswordPage/ResetPassword.vue'

export default {
  name: 'resetPassword',
  components: {
    SignUpHeader,
    ResetPassword
  },

  data() {}
}
</script>
