<template>
  <HeaderScreen />
  <DiningOptionsScreen />
</template>

<script>
import HeaderScreen from '@/components/FigX_UniversalHeader/UniversalHeader.vue'
import DiningOptionsScreen from '@/components/Fig8_DiningOptionsPage/DOScreen.vue'

export default {
  name: 'DiningOptionsPage',
  components: {
    HeaderScreen,
    DiningOptionsScreen
  },

  data() {}
}
</script>
