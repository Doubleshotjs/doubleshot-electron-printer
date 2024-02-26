<template>
  <div class="print-ctrl">
    <div class="flex-1 px-25px py-20px">
      <var-space direction="column" size="large">
        <!-- Device -->
        <var-select placeholder="Printer" v-model="printInfo.deviceName">
          <var-option v-for="printer in printerList" :key="printer.name" :value="printer.name"
            :label="printer.displayName" />
        </var-select>

        <!-- Content -->
        <var-input placeholder="Content" v-model="printInfo.content" :maxlength="20" />

        <!-- Page Size -->
        <div>
          <var-select placeholder="Page Size" v-model="printInfo.pageSize.name">
            <var-option v-for="opt in pageSizeOpts" :key="opt.value" :value="opt.value" :label="opt.label" />
          </var-select>

          <template v-if="printInfo.pageSize.name === 'Custom'">
            <div class="text-13px text-stone-500 my-5px">Width x Height (px)</div>
            <div class="flex items-center ">
              <var-counter :decimal-length="0" :step="50" :min="100" :max="1000" v-model="printInfo.pageSize.size.width"
                label="Width" />
              <i-fluent-dismiss-12-regular class="mx-10px text-stone-500" />
              <var-counter :decimal-length="0" :step="50" :min="100" :max="1000" v-model="printInfo.pageSize.size.height"
                label="Height" />
            </div>
          </template>
        </div>

        <!-- Landscape -->
        <div>
          <div class="text-13px text-stone-500 mr-5px w-50px">Landscape</div>
          <var-switch v-model="printInfo.landscape" />
        </div>

        <!-- Font Size -->
        <div>
          <var-select placeholder="Font Size" v-model="printInfo.fontSize">
            <var-option v-for="size in FONT_SIZE" :key="size" :value="size" :label="`${size}px`" />
          </var-select>
        </div>

        <!-- Margins -->
        <div>
          <var-select placeholder="Margins" v-model="printInfo.margins.marginType">
            <var-option value="default" label="Default" />
            <var-option value="none" label="None" />
            <var-option value="custom" label="Custom" />
          </var-select>

          <template v-if="printInfo.margins.marginType === 'custom'">
            <div class="flex items-center my-5px">
              <div class="text-13px text-stone-500 mr-5px w-50px">Top:</div>
              <var-counter :decimal-length="0" :step="1" :min="0" :max="50" v-model="printInfo.margins.top" />
            </div>
            <div class="flex items-center my-5px">
              <div class="text-13px text-stone-500 mr-5px w-50px">Right:</div>
              <var-counter :decimal-length="0" :step="1" :min="0" :max="50" v-model="printInfo.margins.right" />
            </div>
            <div class="flex items-center my-5px">
              <div class="text-13px text-stone-500 mr-5px w-50px">Bottom:</div>
              <var-counter :decimal-length="0" :step="1" :min="0" :max="50" v-model="printInfo.margins.bottom" />
            </div>
            <div class="flex items-center my-5px">
              <div class="text-13px text-stone-500 mr-5px w-50px">Left:</div>
              <var-counter :decimal-length="0" :step="1" :min="0" :max="50" v-model="printInfo.margins.left" />
            </div>
          </template>
        </div>

        <!-- DPI -->
        <div>
          <var-select placeholder="DPI" v-model="printInfo.dpi">
            <var-option v-for="d in DPI" :key="d" :value="d" :label="`${d} dpi`" />
          </var-select>
        </div>
      </var-space>
    </div>


    <div class="ctrl-footer">
      <var-button type="primary" class="w-100px" @click="doPrint">
        <i-fluent-print-28-regular class="mr-5px text-18px" />
        Print
      </var-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPrinterList, preparePrint } from '@src/electron'
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import { Snackbar } from '@varlet/ui'
import type { PrintInfo, PrinterInfo } from '@shared/types';
import { toRaw } from 'vue';
import { PAGE_SIZE, FONT_SIZE, DPI } from './constants'
import { computed } from 'vue';

const printInfo = defineModel<PrintInfo>('printInfo', { required: true })

const printerList = ref<PrinterInfo[]>([])
onBeforeMount(async () => {
  printerList.value = await getPrinterList()
  console.log(printerList.value)
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

  preparePrint(toRaw(printInfo.value))
}

const pageSizeOpts = computed(() => {
  const ps = Object.keys(PAGE_SIZE).map((key) => {
    return {
      label: key,
      value: key,
    }
  })

  ps.push({
    label: 'Custom',
    value: 'Custom',
  })

  return ps
})
</script>

<style lang="scss" scoped>
.print-ctrl {
  @apply bg-white h-full flex flex-col;
  border-right: 1px solid #e4e7eb;

  .ctrl-footer {
    @apply h-60px w-full flex items-center justify-center;
    border-top: 1px solid #e4e7eb;
  }
}
</style>