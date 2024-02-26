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
  fontSize: PrintInfo['fontSize']
  landscape: PrintInfo['landscape']
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
async function renderContent() {
  if (!canvasRef.value || !props.content)
    return

  // resize canvas
  canvasRef.value.width = canvasRef.value.clientWidth
  canvasRef.value.height = canvasRef.value.clientHeight

  // clear canvas
  const ctx = canvasRef.value.getContext('2d')!
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  // draw qr code
  const qrUrl = await QRCode.toDataURL(props.content, { margin: 0, width: 100 })
  const img = new Image()
  img.src = qrUrl
  img.onload = () => {
    ctx.drawImage(img, 0, 0)
  }

  // draw text
  ctx.font = `${props.fontSize}px Dosis`
  ctx.fillText(props.content, 0, 130)
}

watch(
  () => [canvasRef.value, props.content, props.pageSize, props.fontSize, props.landscape, props.margins],
  () => {
    renderContent()
  },
  { flush: 'post', deep: true },
)

const pageSizeStyle = computed(() => {
  let style = ''
  if (props.pageSize.name === 'Custom') {
    style = props.landscape ? `width: ${props.pageSize.size.height}px; height: ${props.pageSize.size.width}px;` : `width: ${props.pageSize.size.width}px; height: ${props.pageSize.size.height}px;`
  } else {
    const size = PAGE_SIZE[props.pageSize.name!]
    style = props.landscape ? `width: ${size.height}cm; height: ${size.width}cm;` : `width: ${size.width}cm; height: ${size.height}cm;`
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