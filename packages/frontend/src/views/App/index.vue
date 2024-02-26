<script setup lang="ts">
import { ref } from 'vue';
import { PrinterCtrl, Preview } from './components'
import type { PrintInfo } from '@shared/types';

const printInfo = ref<PrintInfo>({
  content: 'Hello, World!',
  fontSize: 18,
  deviceName: '',
  landscape: false,
  margins: {
    marginType: 'default',
  },
  pageSize: {
    name: 'A4',
    size: { width: 300, height: 200 },
  },
  dpi: 300,
})
</script>

<template>
  <div class="w-full h-full flex box-border">
    <div class="w-300px">
      <PrinterCtrl v-model:print-info="printInfo" />
    </div>

    <div style="width: calc(100% - 300px);">
      <Preview :content="printInfo.content" :page-size="printInfo.pageSize" :margins="printInfo.margins" />
    </div>
  </div>
</template>
