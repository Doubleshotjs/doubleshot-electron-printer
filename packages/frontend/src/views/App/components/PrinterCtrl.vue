<template>
  <var-card>
    <template #description>
      <div class="p-15px">
        <var-space direction="column" size="large">
          <var-select placeholder="Printer" v-model="printInfo.deviceName">
            <var-option v-for="printer in printerList" :key="printer.name" :value="printer.name"
              :label="printer.displayName" />
          </var-select>

          <var-input placeholder="Content" v-model="printInfo.content" />

          <div class="mt-15px text-center">
            <var-button type="primary" class="w-100px" @click="doPrint">
              <i-fluent-print-28-regular class="mr-5px text-18px" />
              Print
            </var-button>
          </div>
        </var-space>

      </div>
    </template>
  </var-card>
</template>

<script setup lang="ts">
import { getPrinterList, handlePrint } from '@src/electron'
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import { Snackbar } from '@varlet/ui'
import type { PrintInfo, PrinterInfo } from '@shared/types';
import { toRaw } from 'vue';

const printInfo = defineModel<PrintInfo>('printInfo', { required: true })

const printerList = ref<PrinterInfo[]>([])
onBeforeMount(async () => {
  printerList.value = await getPrinterList()
  if (printerList.value.length > 0) {
    printInfo.value.deviceName = printerList.value[0].displayName
  }
})

function doPrint() {
  if (!printInfo.value.deviceName) {
    return Snackbar.error('Please select a printer')
  } else if (!printInfo.value.content) {
    return Snackbar.error('Please input content')
  }

  handlePrint(toRaw(printInfo.value))
}
</script>