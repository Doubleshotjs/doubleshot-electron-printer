<script setup lang="ts">

if (window.isElectron) {
  const { useZoomFactor, getPrinterList } = window.electron
  const { update: updateZoomFactor } = useZoomFactor()

  setTimeout(() => {
    updateZoomFactor()
  }, 200);

  window.addEventListener('resize', () => {
    updateZoomFactor()
  })

  getPrinterList().then((list) => {
    console.log('Printer list:', list)
  })
}

const handleClick = () => {
  console.log('Hello')
}
</script>

<template>
  <var-button @click="handleClick">
    <span class="text-2xl text-green-300">
      <i-gg-hello />
      说你好</span>
  </var-button>
</template>

<style></style>
