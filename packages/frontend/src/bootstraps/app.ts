import { createApp } from 'vue'
import App from '@src/views/App/index.vue'

export function bootstraps() {
  createApp(App).mount('#app')
}
