<template>
  <canvas ref="qrCanvasRef" />
</template>

<script setup lang="ts">
import QRCode from 'qrcode'
import { ref, watch } from 'vue';

const props = defineProps<{
  content: string
}>()

const qrCanvasRef = ref<HTMLCanvasElement | null>(null)
watch(
  () => [qrCanvasRef.value, props.content],
  () => {
    if (!qrCanvasRef.value || !props.content)
      return

    QRCode.toCanvas(qrCanvasRef.value, props.content, {
      margin: 0,
      width: 128,
    })
  },
  { flush: 'post' },
)
</script>