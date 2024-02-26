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

onPreparePrint(async (printInfo) => {
  if (!canvasRef.value || !printInfo.content)
    return

  // resize canvas
  canvasRef.value.width = canvasRef.value.clientWidth
  canvasRef.value.height = canvasRef.value.clientHeight

  // clear canvas
  const ctx = canvasRef.value.getContext('2d')!
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  // draw qr code
  const qrUrl = await QRCode.toDataURL(printInfo.content, { margin: 0, width: 100 })
  const img = new Image()
  img.src = qrUrl
  img.onload = () => {
    ctx.drawImage(img, 0, 0)
  }

  // draw text
  ctx.font = `${printInfo.fontSize}px Dosis`
  ctx.fillText(printInfo.content, 0, 130)

  handlePrint()
})

</script>

<style lang="scss">
.printer-view {
  @apply h-full w-full;
}
</style>