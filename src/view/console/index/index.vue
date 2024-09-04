<template>
  <APanel>
    <div class="index">
      <iframe src="https://ac.hamm.cn" />
    </div>
  </APanel>
</template>

<script lang="ts" setup>
import { APanel } from '@/airpower/component'
</script>

<style scoped lang="scss">
.index {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  iframe {
    width: 420px;
    height: auto;
    border: none;
  }
}
</style>
