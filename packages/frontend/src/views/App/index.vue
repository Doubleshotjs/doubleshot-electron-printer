<script setup lang="ts">
import { ref } from 'vue';
import { PrinterCtrl, Preview } from './components'
import type { PrintInfo } from '@shared/types';

const printInfo = ref<PrintInfo>({
  deviceName: '',
  content: 'Hello, World!'
})
</script>

<template>
  <div class="w-full h-full p-20px flex box-border">
    <div class="w-300px mr-20px">
      <PrinterCtrl v-model:print-info="printInfo" />
    </div>

    <div class="flex-1">
      <Preview :content="printInfo.content" />
    </div>
  </div>
</template>
