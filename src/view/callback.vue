<template>
  <div
    v-loading="isLoading"
    class="callback big-loading"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { AirRouter } from '@/airpower/helper/AirRouter'

const isLoading = ref(true)

AirNotification.success(AirRouter.router.currentRoute.value.query.code?.toString())

</script>
<style lang="scss" scoped>
.callback {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}
</style>
