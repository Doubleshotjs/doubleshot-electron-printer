import { createApp } from 'vue'
import Printer from '@src/views/Printer.vue'

export function bootstraps() {
  createApp(Printer).mount('#app')
}
