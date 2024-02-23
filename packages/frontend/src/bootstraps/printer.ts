import { createApp } from 'vue'
import Printer from '@src/views/Printer/index.vue'

export function bootstraps() {
  createApp(Printer).mount('#app')
}
