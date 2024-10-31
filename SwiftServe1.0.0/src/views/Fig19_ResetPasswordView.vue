<template>
  <ResetPasswordHeader />
  <ResetPassword />
</template>

<script>
import ResetPasswordHeader from '@/components/FigX_UniversalHeader/ResetPasswordHeader.vue'
import ResetPassword from '@/components/Fig19_ResetPasswordPage/ResetPassword.vue'

export default {
  name: 'resetPassword',
  components: {
    ResetPasswordHeader,
    ResetPassword
  },

  data() {}
}
</script>
