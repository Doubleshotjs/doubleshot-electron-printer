<template>
  <div class="h-full w-full bg-stone-200 overflow-y-auto p-10px box-border">
    <div :style="pageSizeStyle" class="bg-white shadow-xl mx-auto box-border">
      <canvas ref="canvasRef" class="w-full h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PrintInfo } from '@shared/types';
import QRCode from 'qrcode'
import { ref, watch } from 'vue';
import { PAGE_SIZE } from './constants';
import { computed } from 'vue';

const props = defineProps<{
  content: string
  pageSize: PrintInfo['pageSize']
  margins: PrintInfo['margins']
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

const pageSizeStyle = computed(() => {
  let style = ''
  if (props.pageSize.name === 'Custom') {
    style = `width: ${props.pageSize.size.width}px; height: ${props.pageSize.size.height}px;`
  } else {
    const size = PAGE_SIZE[props.pageSize.name!]
    style = `width: ${size.width}cm; height: ${size.height}cm;`
  }

  if (props.margins.marginType === 'default') {
    style += 'padding: 0.4in;'
  } else if (props.margins.marginType === 'none') {
    style += 'padding: 0;'
  } else if (props.margins.marginType === 'custom') {
    style += `padding: ${props.margins.top ?? 0}px ${props.margins.right ?? 0}px ${props.margins.bottom ?? 0}px ${props.margins.left ?? 0}px;`
  }

  return style
})
</script>