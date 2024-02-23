<template>
  <div class="printer-view">
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup lang="ts">
import { onPreparePrint, handlePrint } from '@src/electron'
import QRCode from 'qrcode'
import { ref } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null)

onPreparePrint((printInfo) => {
  if (!canvasRef.value || !printInfo.content)
    return

  QRCode.toCanvas(canvasRef.value, printInfo.content, {
    margin: 0,
    width: 128,
  })

  handlePrint()
})


</script>

<style lang="scss">
.printer-view {
  @apply border border-solid border-gray-400 h-full w-full;
}
</style>