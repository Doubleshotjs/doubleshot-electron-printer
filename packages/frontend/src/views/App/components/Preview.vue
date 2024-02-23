<template>
  <canvas ref="canvasRef" />
</template>

<script setup lang="ts">
import QRCode from 'qrcode'
import { ref, watch } from 'vue';

const props = defineProps<{
  content: string
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
watch(
  () => [canvasRef.value, props.content],
  () => {
    if (!canvasRef.value || !props.content)
      return

    QRCode.toCanvas(canvasRef.value, props.content, {
      margin: 0,
      width: 128,
    })
  },
  { flush: 'post' },
)
</script>